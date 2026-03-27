export declare const BlogServices: {
    createBlog: (payload: {
        title: string;
        slug: string;
        content: string;
        thumbnail?: string;
        excerpt?: string;
        published?: boolean;
    }) => Promise<any>;
    getAllBlogs: () => Promise<any>;
    getBlogById: (id: number) => Promise<any>;
    updateBlog: (id: number, payload: Partial<{
        title: string;
        slug: string;
        content: string;
        thumbnail: string;
        excerpt: string;
        published: boolean;
    }>) => Promise<any>;
    deleteBlog: (id: number) => Promise<void>;
};
//# sourceMappingURL=blog.service.d.ts.map