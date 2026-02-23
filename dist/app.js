import express, {} from "express";
import compression from "compression";
const app = express();
app.use(compression());
app.use(express.json());
app.get("/", (_req, res) => {
    res.send("API is running");
});
export default app;
