export const handlePrismaValidationError = (err) => {
    return {
        statusCode: 400,
        message: "Prisma Validation Error: Please check your input fields.",
    };
};
