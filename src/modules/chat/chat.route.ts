import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { ChatControllers } from "./chat.controller.js";

const router: Router = Router();

// Public Route: পোর্টফোলিও ভিজিটরদের চ্যাটবটের জন্য
router.post("/", ChatControllers.handleChat);

// Protected Admin Routes: ড্যাশবোর্ড থেকে প্রম্পট কন্ট্রোল করার জন্য
router.get("/config", checkAuth(), ChatControllers.getBotConfig);
router.put("/config", checkAuth(), ChatControllers.updateBotConfig);

export const chatRoutes = router;
export default router;