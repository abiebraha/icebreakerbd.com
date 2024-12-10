import express from "express";
import { registerRoutes } from "./routes";
import { setupVite } from "./vite";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes first
registerRoutes(app);
const server = createServer(app);

const isDev = process.env.NODE_ENV !== "production";
console.log(`Starting server in ${isDev ? "development" : "production"} mode`);

if (isDev) {
  await setupVite(app, server);
} else {
  const distDir = path.join(__dirname, "../dist/public");
  console.log("Static files directory:", distDir);
  
  try {
    // Check if the build directory exists
    if (!fs.existsSync(distDir)) {
      console.error("Build directory not found! Please run npm run build first.");
      process.exit(1);
    }

    // Check if index.html exists
    const indexPath = path.join(distDir, "index.html");
    if (!fs.existsSync(indexPath)) {
      console.error("index.html not found! Build may be incomplete.");
      process.exit(1);
    }

    // Serve static files with appropriate caching
    app.use("/assets", express.static(path.join(distDir, "assets"), {
      maxAge: "1y",
      immutable: true,
      etag: true
    }));

    // Serve other static files
    app.use(express.static(distDir, {
      index: false,
      etag: true,
      maxAge: "1d"
    }));

    // Handle client-side routing
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) {
        return next();
      }

      // Don't serve index.html for actual files
      if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json|map)$/)) {
        return next();
      }

      console.log("Serving index.html for path:", req.path);
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error("Error sending index.html:", err);
          res.status(500).send("Error loading page");
        }
      });
    });
  } catch (error) {
    console.error("Failed to initialize production server:", error);
    process.exit(1);
  }
}

const PORT = process.env.PORT || 3000;
const host = "0.0.0.0";
const portNumber = typeof PORT === 'string' ? parseInt(PORT, 10) : PORT;

server.listen(portNumber, host, () => {
  console.log(`Server running on ${host}:${portNumber} in ${isDev ? "development" : "production"} mode`);
});