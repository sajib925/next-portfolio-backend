import { type JwtPayload } from "jsonwebtoken";
export interface UserTokenPayload extends JwtPayload {
    userId: number;
    email: string;
}
export declare const generateToken: (payload: {
    userId: number;
    email: string;
}, secret: string, expiresIn: string) => string;
export declare const verifyToken: (token: string, secret: string) => UserTokenPayload;
//# sourceMappingURL=jwt.d.ts.map