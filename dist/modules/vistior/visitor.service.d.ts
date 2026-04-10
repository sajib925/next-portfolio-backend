export declare const VisitorServices: {
    logVisitorAndCount: (payload: {
        ip: string;
        userAgent: string;
        page: string;
        referrer?: string;
        country?: string;
        city?: string;
        device?: string;
        browser?: string;
    }) => Promise<{
        count: number;
    }>;
    getAllVisitors: () => Promise<{
        id: number;
        referrer: string | null;
        page: string;
        country: string | null;
        browser: string | null;
        ip: string;
        createdAt: Date;
        userAgent: string;
        city: string | null;
        device: string | null;
    }[]>;
};
//# sourceMappingURL=visitor.service.d.ts.map