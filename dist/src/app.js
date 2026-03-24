import express, {} from "express";
import compression from "compression";
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
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
    ],
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use("/api/v1", apiRoutes);
app.use(notFound);
app.use(globalErrorHandler);
export default app;
