import { Router } from "express"
import { authRoutes } from "../modules/auth/auth.route.js"

export const apiRoutes: Router = Router()

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
]

apiRoutes.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Next Portfolio API v1 is running",
  })
})


moduleRoutes.forEach((route) => {
  apiRoutes.use(route.path, route.route)
})

export default apiRoutes
