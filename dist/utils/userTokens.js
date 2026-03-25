import { generateToken } from "./jwt.js";
export const createUserTokens = (user) => {
    const { JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRES, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES, } = process.env;
    if (!JWT_ACCESS_SECRET || !JWT_ACCESS_EXPIRES || !JWT_REFRESH_SECRET || !JWT_REFRESH_EXPIRES) {
        throw new Error("JWT environment variables are missing");
    }
    const jwtPayload = {
        userId: user.userId,
        email: user.email,
    };
    const accessToken = generateToken(jwtPayload, JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRES);
    const refreshToken = generateToken(jwtPayload, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES);
    return {
        accessToken,
        refreshToken,
    };
};
