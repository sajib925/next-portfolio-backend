import { Router } from "express"
import { BlogControllers } from "./blog.controller.js"
import { checkAuth } from "../../middlewares/checkAuth.js" 

const router: Router = Router()

// Public routes
router.get("/", BlogControllers.getAllBlogs)
router.get("/:id", BlogControllers.getBlogById)

// Protected routes 
router.post("/", checkAuth(), BlogControllers.createBlog)
router.patch("/:id", checkAuth(), BlogControllers.updateBlog)
router.delete("/:id", checkAuth(), BlogControllers.deleteBlog)

export const blogRoutes = router
export default router