import express, {} from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandle.js";
const app = express();
// ✅ Allowed origin (frontend)
const FRONTEND_URL = "http://localhost:3000";
// ✅ CORS (STRICT + SAFE)
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));
// ✅ 🔥 IMPORTANT: Force headers (fix Vercel override issue)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", FRONTEND_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    // ✅ Handle preflight request
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
// ✅ Middlewares
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ✅ Trust proxy (Vercel)
app.set("trust proxy", 1);
// ✅ Health check
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running 🚀",
    });
});
// ✅ Routes
app.use("/api/v1", apiRoutes);
// ❌ Not found
app.use(notFound);
// ❌ Global error handler
app.use(globalErrorHandler);
export default app;
