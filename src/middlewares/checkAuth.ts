import type { Request, Response, NextFunction } from "express"
import httpStatus from "http-status-codes"
import AppError from "../errorHelper/appError.js"
import { verifyToken } from "../utils/jwt.js"

export const checkAuth = () => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies.accessToken || req.headers.authorization?.split(" ")[1]

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "No access token provided")
      }

      const decoded = verifyToken(token, process.env.JWT_ACCESS_SECRET as string)

      req.user = decoded as { userId: number; email: string }

      next()
    } catch (err) {
      next(new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access"))
    }
  }
}
