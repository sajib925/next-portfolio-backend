import { Router } from "express"
import { AuthControllers } from "./auth.controller.js"

const router: Router = Router()

router.post("/login", AuthControllers.login)
router.post("/refresh-token", AuthControllers.refreshToken)
router.post("/logout", AuthControllers.logout)
router.post("/change-password", AuthControllers.changePassword)
router.get("/profile", AuthControllers.getProfile)
router.patch("/profile", AuthControllers.updateProfile)

export const authRoutes = router
export default router
