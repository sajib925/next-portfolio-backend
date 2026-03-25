import { Router } from "express";
import { AuthControllers } from "./auth.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
const router = Router();
// Public routes
router.post("/login", AuthControllers.login);
router.post("/refresh-token", AuthControllers.refreshToken);
router.post("/logout", AuthControllers.logout);
// Protected routes (requires login)
router.get("/profile", checkAuth(), AuthControllers.getProfile);
router.post("/change-password", checkAuth(), AuthControllers.changePassword);
router.patch("/update-profile", checkAuth(), AuthControllers.updateProfile);
export const authRoutes = router;
export default router;
