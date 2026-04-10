export declare const ContactServices: {
    createContact: (payload: {
        name: string;
        email: string;
        subject?: string;
        message: string;
    }) => Promise<{
        name: string;
        message: string;
        id: number;
        email: string;
        subject: string | null;
        createdAt: Date;
        replied: boolean;
        reply: string | null;
    }>;
    getAllContacts: () => Promise<{
        name: string;
        message: string;
        id: number;
        email: string;
        subject: string | null;
        createdAt: Date;
        replied: boolean;
        reply: string | null;
    }[]>;
    getContactById: (id: number) => Promise<{
        name: string;
        message: string;
        id: number;
        email: string;
        subject: string | null;
        createdAt: Date;
        replied: boolean;
        reply: string | null;
    }>;
    updateContact: (id: number, payload: Partial<{
        replied: boolean;
        reply?: string;
    }>) => Promise<{
        name: string;
        message: string;
        id: number;
        email: string;
        subject: string | null;
        createdAt: Date;
        replied: boolean;
        reply: string | null;
    }>;
    deleteContact: (id: number) => Promise<{
        name: string;
        message: string;
        id: number;
        email: string;
        subject: string | null;
        createdAt: Date;
        replied: boolean;
        reply: string | null;
    }>;
    replyToContact: (id: number, replyMessage: string) => Promise<{
        name: string;
        message: string;
        id: number;
        email: string;
        subject: string | null;
        createdAt: Date;
        replied: boolean;
        reply: string | null;
    }>;
};
//# sourceMappingURL=contact.service.d.ts.map