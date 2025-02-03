import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import log from "./tools/logger.js";
import userRoutes from "./routes/v1/userRoutes.js";

dotenv.config();

const app = express();
const httpPort = process.env.HTTP_PORT;
const httpsPort = process.env.HTTPS_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/v1/user", userRoutes);
app.use("/*", (_, res) => res.status(404).json({ error: "Not found" }));

let httpsServer = null;

const httpServer = app.listen(httpPort, () => {
    log("start", "startup", `HTTP started on port ${httpPort}`);
});

// Graceful shutdown function
const gracefulShutdown = (signal) => {
    log(
        "stop",
        "shutdown",
        `Received ${signal}. Shutting down gracefully...`,
        0,
        ""
    );

    // Close HTTP server
    httpServer.close((err) => {
        if (err) {
            log(
                "error",
                "shutdown",
                `Error during HTTP shutdown: ${err.message}`,
                1,
                ""
            );
        } else {
            log("stop", "shutdown", "HTTP server closed.", 0, "");
        }
    });

    if (httpsServer) {
        // Close HTTPS server
        httpsServer.close((err) => {
            if (err) {
                log(
                    "error",
                    "shutdown",
                    `Error during HTTPS shutdown: ${err.message}`,
                    1,
                    ""
                );
            } else {
                log("stop", "shutdown", "HTTPS server closed.", 0, "");
            }
        });
    }

    setTimeout(() => process.exit(0), 100); // Ensure logs are written before exiting
};

// Handle termination signals
process.on("SIGHUP", () => gracefulShutdown("SIGHUP"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
