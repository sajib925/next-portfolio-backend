import express, { type Express } from "express";
import compression from "compression";
import apiRoutes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandle.js";

const app: Express = express();

app.use(compression()); 
app.use(express.json()); 


app.use("/api/v1", apiRoutes)

app.use(notFound)

app.use(globalErrorHandler)



export default app;