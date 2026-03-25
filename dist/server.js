import http, { Server } from "http";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import app from "./app.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
let server = null;
async function startServer() {
    try {
        await db.$connect();
        console.log("✅ Database connection successful!!");
        server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`🚀 CodeToFlow Server is running on port http://localhost:${PORT}/api/v1`);
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
                console.log("✅ Database disconnected & Server closed.");
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
