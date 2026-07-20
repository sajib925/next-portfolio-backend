export declare const ReviewServices: {
    createReview: (payload: {
        clientAvatar: string;
        clientName: string;
        clientDesignation: string;
        clientMessage: string;
    }) => Promise<{
        id: number;
        createdAt: Date;
        clientAvatar: string | null;
        clientName: string | null;
        clientDesignation: string;
        clientMessage: string;
    }>;
    getAllReview: () => Promise<{
        id: number;
        createdAt: Date;
        clientAvatar: string | null;
        clientName: string | null;
        clientDesignation: string;
        clientMessage: string;
    }[]>;
    deleteReview: (id: number) => Promise<{
        id: number;
        createdAt: Date;
        clientAvatar: string | null;
        clientName: string | null;
        clientDesignation: string;
        clientMessage: string;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map