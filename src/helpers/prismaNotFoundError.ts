import type { Prisma } from "@prisma/client";
import type { TGenericErrorResponse } from "../interfaces/error.type.js";


export const handlePrismaNotFoundError = (
  err: Prisma.PrismaClientKnownRequestError
): TGenericErrorResponse => {
  return {
    statusCode: 404,
    message: err.meta?.cause as string || "Record not found!",
  };
};