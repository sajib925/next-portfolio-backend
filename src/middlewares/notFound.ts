import { type Request, type Response } from "express";
import httpStatus from "http-status-codes";

const notFound = (_req: Request, res: Response) => {
    // ✅ Ensure CORS headers are preserved for 404 responses
    const FRONTEND_URL = process.env.FRONTEND_URL || "https://next-portfolio-frontend-ivory.vercel.app";
    res.header("Access-Control-Allow-Origin", FRONTEND_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Route Not Found"
    })
}

export default notFound