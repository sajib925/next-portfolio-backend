import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { ReviewControllers } from "./review.controller.js";
const router = Router();
// Public routes
router.get("/", ReviewControllers.getAllReviews);
// Protected routes
router.post("/create", checkAuth(), ReviewControllers.createReview);
router.delete("/:id", checkAuth(), ReviewControllers.deleteReview);
export const reviewRoutes = router;
export default router;
