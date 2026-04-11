import express, {} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandle.js";
const app = express();
const allowedOrigins = [
    "http://localhost:3000",
    "https://next-portfolio-frontend-ivory.vercel.app",
];
app.use(cors({
    origin: function (origin, callback) {
        // allow tools like Postman (no origin)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
// Health check
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to portfolio API",
        version: "1.0.0",
    });
});
app.use("/api/v1", apiRoutes);
app.use(notFound);
app.use(globalErrorHandler);
export default app;
