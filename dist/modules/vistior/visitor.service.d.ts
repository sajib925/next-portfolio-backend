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
        count: any;
    }>;
    getAllVisitors: () => Promise<any>;
};
//# sourceMappingURL=visitor.service.d.ts.map