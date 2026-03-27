export declare const ProjectServices: {
    createProject: (payload: {
        title: string;
        slug: string;
        description: string;
        thumbnail?: string;
        frontendLiveLink?: string;
        backendLiveLink?: string;
        frontendGithubLink?: string;
        backendGithubLink?: string;
        technologies: string[];
        featured?: boolean;
    }) => Promise<any>;
    getAllProjects: () => Promise<any>;
    getProjectById: (id: number) => Promise<any>;
    updateProject: (id: number, payload: Partial<{
        title: string;
        slug: string;
        description: string;
        thumbnail: string;
        frontendLiveLink: string;
        backendLiveLink: string;
        frontendGithubLink: string;
        backendGithubLink: string;
        technologies: string[];
        featured: boolean;
    }>) => Promise<any>;
    deleteProject: (id: number) => Promise<any>;
};
//# sourceMappingURL=project.service.d.ts.map