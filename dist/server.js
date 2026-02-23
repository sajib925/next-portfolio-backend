import http, { Server } from "http";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import app from "./app.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
let server = null;
async function startServer() {
    try {
        // 1. Connect to DB first
        await db.$connect();
        console.log("✅ DB connection successful!!");
        // 2. Create and start HTTP server
        server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
        handleProcessEvents();
    }
    catch (error) {
        console.error("❌ Error during server startup:", error);
        process.exit(1);
    }
}
function handleProcessEvents() {
    const shutdown = (signal) => {
        console.warn(`\n🔄 Received ${signal}, shutting down...`);
        if (server) {
            server.close(async () => {
                await db.$disconnect();
                console.log("✅ DB disconnected & Server closed.");
                process.exit(0);
            });
        }
        else {
            process.exit(0);
        }
    };
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
}
startServer();
