import { Router } from "express"
import { ProjectControllers } from "./project.controller.js"
import { checkAuth } from "../../middlewares/checkAuth.js"

const router: Router = Router()

// Public routes
router.get("/", ProjectControllers.getAllProjects)
router.get("/:id", ProjectControllers.getProjectById)

// Protected routes
router.post("/create", checkAuth(), ProjectControllers.createProject)
router.patch("/:id", checkAuth(), ProjectControllers.updateProject)
router.delete("/:id", checkAuth(), ProjectControllers.deleteProject)

export const projectRoutes = router
export default router