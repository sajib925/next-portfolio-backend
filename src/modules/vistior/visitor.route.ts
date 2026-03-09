import { Router } from "express"
import { VisitorControllers } from "./visitor.controller.js"

const router: Router = Router()

// Public route 
router.post("/log", VisitorControllers.logVisitor)

//  get all visitors 
router.get("/", VisitorControllers.getAllVisitors)

export const visitorRoutes = router
export default router