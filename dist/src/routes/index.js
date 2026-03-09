import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route.js";
import { projectRoutes } from "../modules/projects/project.route.js";
import { contactRoutes } from "../modules/contact/contact.route.js";
import { blogRoutes } from "../modules/blog/blog.route.js";
import { visitorRoutes } from "../modules/vistior/visitor.route.js";
export const apiRoutes = Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: authRoutes,
    },
    {
        path: "/blogs",
        route: blogRoutes,
    },
    {
        path: "/contacts",
        route: contactRoutes,
    },
    {
        path: "/projects",
        route: projectRoutes,
    },
    {
        path: "/visitors",
        route: visitorRoutes,
    },
];
apiRoutes.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Next Portfolio API v1 is running",
    });
});
moduleRoutes.forEach((route) => {
    apiRoutes.use(route.path, route.route);
});
export default apiRoutes;
