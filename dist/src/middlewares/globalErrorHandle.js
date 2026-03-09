import {} from "express";
import { Prisma } from "@prisma/client";
import AppError from "../errorHelper/appError.js";
import { handlePrismaDuplicateError } from "../helpers/prismaClientError.js";
import { handlePrismaNotFoundError } from "../helpers/prismaNotFoundError.js";
import { handlePrismaValidationError } from "../helpers/prismaValidationError.js";
import { handlerZodError } from "../helpers/zodError.js";
export const globalErrorHandler = async (err, _req, res, _next) => {
    let statusCode = 500;
    let message = "Something Went Wrong!!";
    let errorSources = [];
    if (process.env.NODE_ENV === "development") {
        console.error("💥 Global Error:", err);
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            const simplified = handlePrismaDuplicateError(err);
            statusCode = simplified.statusCode;
            message = simplified.message;
        }
        else if (err.code === "P2025" || err.code === "P2023") {
            const simplified = handlePrismaNotFoundError(err);
            statusCode = simplified.statusCode;
            message = simplified.message;
        }
    }
    else if (err instanceof Prisma.PrismaClientValidationError) {
        const simplified = handlePrismaValidationError(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
    }
    else if (err?.name === "ZodError" || err.issues) {
        const simplified = handlerZodError(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorSources = simplified.errorSources;
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
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
