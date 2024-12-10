import express from "express";
import { registerRoutes } from "./routes.js";
import { setupVite } from "./vite.js";
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
      console.log("Build directory contents:", fs.readdirSync(publicDir));
    } catch (error) {
      console.error("Error checking build files:", error);
      process.exit(1);
    }

    // Serve static assets with proper headers
    app.use(express.static(publicDir, {
      index: false, // Don't serve index.html automatically
      etag: true,
      lastModified: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          // Don't cache HTML files
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        } else if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
          // Cache static assets
          res.setHeader('Cache-Control', 'public, max-age=31536000');

          // Set correct MIME type for JavaScript files
          if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
          }
        }
      }
    }));

    // Handle all routes for SPA
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }

      console.log(`[${new Date().toISOString()}] Attempting to serve index.html for path: ${req.path}`);
      try {
        res.sendFile(indexPath, {
          headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
      } catch (error) {
        console.error('Error serving index.html:', error);
        res.status(500).send('Internal Server Error');
      }
    });
  }

  const PORT = parseInt(process.env.PORT || "5000", 10);
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV} mode`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
