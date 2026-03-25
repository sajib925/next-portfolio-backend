export const handlePrismaNotFoundError = (err) => {
    return {
        statusCode: 404,
        message: err.meta?.cause || "Record not found!",
    };
};
