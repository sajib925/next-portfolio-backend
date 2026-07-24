export declare const ReviewServices: {
    createReview: (payload: {
        clientAvatar: string;
        clientName: string;
        clientDesignation: string;
        clientMessage: string;
        rating: number;
    }) => Promise<{
        id: number;
        createdAt: Date;
        clientAvatar: string | null;
        clientName: string | null;
        clientDesignation: string;
        clientMessage: string;
        rating: number;
    }>;
    getAllReview: () => Promise<{
        id: number;
        createdAt: Date;
        clientAvatar: string | null;
        clientName: string | null;
        clientDesignation: string;
        clientMessage: string;
        rating: number;
    }[]>;
    deleteReview: (id: number) => Promise<{
        id: number;
        createdAt: Date;
        clientAvatar: string | null;
        clientName: string | null;
        clientDesignation: string;
        clientMessage: string;
        rating: number;
    }>;
    updateReview: (id: number, payload: Partial<{
        clientAvatar: string;
        clientName: string;
        clientDesignation: string;
        clientMessage: string;
        rating: number;
    }>) => Promise<{
        id: number;
        createdAt: Date;
        clientAvatar: string | null;
        clientName: string | null;
        clientDesignation: string;
        clientMessage: string;
        rating: number;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map