import { type NextFunction, type Request, type Response } from "express";
import { Prisma } from "@prisma/client";
import AppError from "../errorHelper/appError.js";
import type { TErrorSources } from "../interfaces/error.type.js";
import { handlePrismaDuplicateError } from "../helpers/prismaClientError.js";
import { handlePrismaNotFoundError } from "../helpers/prismaNotFoundError.js";
import { handlePrismaValidationError } from "../helpers/prismaValidationError.js";
import { handlerZodError } from "../helpers/zodError.js";

export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = "Something Went Wrong!!";
    let errorSources: TErrorSources[] = [];

    // Development এ লগ দেখার জন্য
    if (process.env.NODE_ENV === "development") {
        console.error("💥 Global Error:", err);
    }

    // ১. Prisma Known Request Errors (Database level errors)
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") { // Unique constraint
            const simplified = handlePrismaDuplicateError(err);
            statusCode = simplified.statusCode;
            message = simplified.message;
        } 
        else if (err.code === "P2025" || err.code === "P2023") { // Not found or Invalid ID
            const simplified = handlePrismaNotFoundError(err);
            statusCode = simplified.statusCode;
            message = simplified.message;
        }
    }
    // ২. Prisma Validation Errors (Schema mismatch)
    else if (err instanceof Prisma.PrismaClientValidationError) {
        const simplified = handlePrismaValidationError(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
    }
    // ৩. Zod Validation Error
    else if (err?.name === "ZodError" || err.issues) {
        const simplified = handlerZodError(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorSources = simplified.errorSources as TErrorSources[];
    }
    // ৪. কাস্টম AppError
    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } 
    // ৫. জেনারেল এরর
    else if (err instanceof Error) {
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    });
};
