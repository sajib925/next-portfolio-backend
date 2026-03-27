import type { JwtPayload } from "jsonwebtoken";
export declare const AuthServices: {
    login: (payload: {
        email: string;
        password: string;
    }) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    getNewAccessToken: (refreshToken: string) => Promise<{
        accessToken: string;
    }>;
    changePassword: (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => Promise<void>;
    getProfile: (userId: number) => Promise<any>;
    updateProfile: (userId: number, payload: {
        name?: string;
        mobile?: string;
        bio?: string;
        picture?: string;
    }) => Promise<any>;
};
//# sourceMappingURL=auth.service.d.ts.map