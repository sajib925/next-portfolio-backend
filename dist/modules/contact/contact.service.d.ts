export declare const ContactServices: {
    createContact: (payload: {
        name: string;
        email: string;
        subject?: string;
        message: string;
    }) => Promise<any>;
    getAllContacts: () => Promise<any>;
    getContactById: (id: number) => Promise<any>;
    updateContact: (id: number, payload: Partial<{
        replied: boolean;
        reply?: string;
    }>) => Promise<any>;
    deleteContact: (id: number) => Promise<any>;
    replyToContact: (id: number, replyMessage: string) => Promise<any>;
};
//# sourceMappingURL=contact.service.d.ts.map