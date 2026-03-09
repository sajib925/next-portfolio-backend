export const handlePrismaDuplicateError = (err) => {
    const target = err.meta?.target || ["Field"];
    return {
        statusCode: 400,
        message: `${target.join(", ")} already exists!`,
    };
};
