export declare const BlogServices: {
    createBlog: (payload: {
        title: string;
        slug: string;
        content: string;
        thumbnail?: string;
        excerpt?: string;
        published?: boolean;
    }) => Promise<{
        id: number;
        content: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        thumbnail: string | null;
        excerpt: string | null;
        published: boolean;
        views: number;
    }>;
    getAllBlogs: () => Promise<{
        id: number;
        content: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        thumbnail: string | null;
        excerpt: string | null;
        published: boolean;
        views: number;
    }[]>;
    getBlogById: (id: number) => Promise<{
        id: number;
        content: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        thumbnail: string | null;
        excerpt: string | null;
        published: boolean;
        views: number;
    }>;
    updateBlog: (id: number, payload: Partial<{
        title: string;
        slug: string;
        content: string;
        thumbnail: string;
        excerpt: string;
        published: boolean;
    }>) => Promise<{
        id: number;
        content: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        thumbnail: string | null;
        excerpt: string | null;
        published: boolean;
        views: number;
    }>;
    deleteBlog: (id: number) => Promise<void>;
};
//# sourceMappingURL=blog.service.d.ts.map