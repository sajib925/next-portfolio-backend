import express, { type Express } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandle.js";

const app: Express = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://next-portfolio-frontend.vercel.app", // your frontend domain
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(compression());
app.use(express.json());

app.use("/api/v1", apiRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;