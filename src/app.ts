import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandle.js";

const app: Express = express();

// ✅ Allow all origins (DEV / OPEN MODE)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

// Health check
app.get("/", (_req: Request, res: Response) => {
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