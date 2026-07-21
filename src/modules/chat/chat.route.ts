import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { ChatControllers } from "./chat.controller.js";

const router: Router = Router();

// Public Route
router.post("/", ChatControllers.handleChat);

// Protected Admin Routes
router.get("/config", checkAuth(), ChatControllers.getBotConfig);
router.put("/config", checkAuth(), ChatControllers.updateBotConfig);

export const chatRoutes = router;
export default router;