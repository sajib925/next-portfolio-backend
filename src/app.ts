import express, { type Express } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandle.js";

const app: Express = express();

cors({
  origin: "https://next-portfolio-frontend-ivory.vercel.app",
  credentials: true,
})



app.use(cookieParser());
app.use(compression());
app.use(express.json());

app.use("/api/v1", apiRoutes);

app.use(notFound);

app.use(globalErrorHandler);

export default app;
