import { Router } from "express";
import { ContactControllers } from "./contact.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
const router = Router();
// Public route
router.post("/", ContactControllers.createContact);
// Protected routes
router.get("/", checkAuth(), ContactControllers.getAllContacts);
router.get("/:id", checkAuth(), ContactControllers.getContactById);
router.patch("/:id", checkAuth(), ContactControllers.updateContact);
router.delete("/:id", checkAuth(), ContactControllers.deleteContact);
router.post("/:id/reply", checkAuth(), ContactControllers.replyContact);
export const contactRoutes = router;
export default router;
