import express, {} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandle.js";
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
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
