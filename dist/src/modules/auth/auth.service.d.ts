import type { JwtPayload } from "jsonwebtoken";
export declare const AuthServices: {
    login: (payload: {
        email: string;
        password: string;
    }) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            name: string | null;
            location: string | null;
            id: number;
            picture: string | null;
            username: string | null;
            mobile: string | null;
            email: string;
            bio: string | null;
            coverPhoto: string | null;
            alternateEmail: string | null;
            website: string | null;
            github: string | null;
            linkedin: string | null;
            twitter: string | null;
            facebook: string | null;
            instagram: string | null;
            designation: string | null;
            company: string | null;
            experience: string | null;
            skills: string[];
            resumeUrl: string | null;
            isActive: boolean;
            isVerified: boolean;
            lastLogin: Date | null;
            passwordChangedAt: Date | null;
            loginAttempts: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getNewAccessToken: (refreshToken: string) => Promise<{
        accessToken: string;
    }>;
    changePassword: (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => Promise<void>;
    getProfile: (userId: number) => Promise<{}>;
    updateProfile: (userId: number, payload: {
        name?: string;
        mobile?: string;
        bio?: string;
        picture?: string;
    }) => Promise<{}>;
};
//# sourceMappingURL=auth.service.d.ts.map