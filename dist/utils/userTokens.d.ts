interface UserTokenPayload {
    userId: number;
    email: string;
}
export declare const createUserTokens: (user: UserTokenPayload) => {
    accessToken: string;
    refreshToken: string;
};
export {};
//# sourceMappingURL=userTokens.d.ts.map