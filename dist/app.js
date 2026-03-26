import express, {} from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandle.js";
const app = express();
app.use(cors({
    origin: "https://next-portfolio-frontend-ivory.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
}));
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
{ /*
  {
    "version": 2,
    "builds": [
        {
            "src": "dist/server.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "dist/server.js"
        }
    ]
}
*/
}
