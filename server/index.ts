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

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Register API routes first
  registerRoutes(app);
  const server = createServer(app);

  const isDev = process.env.NODE_ENV !== "production";
  console.log(`Starting server in ${isDev ? "development" : "production"} mode`);

  if (isDev) {
    console.log("Setting up development server with Vite");
    await setupVite(app, server);
  } else {
    console.log("Configuring production server");
    const publicDir = path.join(__dirname, "..", "dist", "public");
    const indexPath = path.join(publicDir, "index.html");

    // Verify build files exist
    try {
      if (!fs.existsSync(publicDir)) {
        console.error(`Build directory not found at: ${publicDir}`);
        console.error("Please run 'npm run build' first");
        process.exit(1);
      }
      if (!fs.existsSync(indexPath)) {
        console.error(`Index.html not found at: ${indexPath}`);
        console.error("Please run 'npm run build' first");
        process.exit(1);
      }
      console.log(`Serving static files from: ${publicDir}`);
    } catch (error) {
      console.error("Error checking build files:", error);
      process.exit(1);
    }

    // Serve static assets
    app.use(express.static(publicDir, {
      index: false // Let our catch-all handle index.html
    }));

    // Handle all routes for SPA
    app.get("*", (req, res, next) => {
      // Skip API routes and static files
      if (req.path.startsWith("/api") || req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json|map|woff|woff2|ttf|eot)$/)) {
        return next();
      }

      // Log route handling
      console.log(`[${new Date().toISOString()}] Serving index.html for path: ${req.path}`);
      
      // Ensure the index.html file exists
      if (!fs.existsSync(indexPath)) {
        console.error(`[${new Date().toISOString()}] index.html not found at ${indexPath}`);
        return res.status(500).send("Server configuration error");
      }

      // Send index.html with proper headers for SPA routing
      res.sendFile(indexPath, {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }, (err) => {
        if (err) {
          console.error(`[${new Date().toISOString()}] Error sending index.html:`, err);
          res.status(500).send("Internal Server Error");
        }
      });
    });
  }

  const PORT = parseInt(process.env.PORT || "3000", 10);
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV} mode`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
