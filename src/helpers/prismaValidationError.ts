import type { Prisma } from "@prisma/client";
import type { TGenericErrorResponse } from "../interfaces/error.type.js";

export const handlePrismaValidationError = (
  err: Prisma.PrismaClientValidationError
): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Prisma Validation Error: Please check your input fields.",
  };
};