import express, {} from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandle.js";
const app = express();
// ✅ Get frontend URL from environment or use default
const FRONTEND_URL = process.env.FRONTEND_URL || "https://next-portfolio-frontend-ivory.vercel.app";
// ✅ CORS Configuration - STRICT + SAFE
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    exposedHeaders: ["Content-Length", "X-JSON-Response"],
    maxAge: 86400, // 24 hours
}));
// ✅ Explicit CORS headers middleware (fixes Vercel serverless issues)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", FRONTEND_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // ✅ Handle preflight requests
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.get("/", (_req, res) => {
    res.status(200).json({ success: true, message: "API is running 🚀" });
});
app.use("/api/v1", apiRoutes);
app.use(notFound);
app.use(globalErrorHandler);
export default app;
