import type { Prisma } from "@prisma/client";
import type { TGenericErrorResponse } from "../interfaces/error.type.js";

export const handlePrismaDuplicateError = (
  err: Prisma.PrismaClientKnownRequestError
): TGenericErrorResponse => {
  const target = (err.meta?.target as string[]) || ["Field"];
  
  return {
    statusCode: 400,
    message: `${target.join(", ")} already exists!`,
  };
};