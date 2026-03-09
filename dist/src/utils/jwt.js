import jwt, {} from "jsonwebtoken";
// Generate JWT
export const generateToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn });
};
// Verify JWT and ensure userId is number
export const verifyToken = (token, secret) => {
    const verifiedToken = jwt.verify(token, secret);
    return {
        ...verifiedToken,
        userId: Number(verifiedToken.userId), // convert string -> number
        email: verifiedToken.email,
    };
};
