import express from "express";
import { registerRoutes } from "./routes.js";
import { setupVite, serveStatic } from "./vite.js";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import type { Stats } from 'fs';
import type { Request, Response, NextFunction } from 'express';
import type { Server } from "http";

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
    
    // Set up paths for static files
    const clientDir = path.resolve(__dirname, "..");
    const publicDir = path.resolve(clientDir, "dist", "public");
    const indexPath = path.resolve(publicDir, "index.html");

    // Enhanced logging for debugging
    console.log("Production server configuration:");
    console.log("- Client directory:", clientDir);
    console.log("- Public directory:", publicDir);
    console.log("- Index path:", indexPath);

    // Verify build files exist
    if (!fs.existsSync(publicDir)) {
      console.error(`Build directory not found at: ${publicDir}`);
      console.error("Current directory:", __dirname);
      console.error("Available files:", fs.readdirSync(path.resolve(__dirname, "..")));
      process.exit(1);
    }

    // Log the contents of the build directory
    console.log("Build directory structure:");
    const listDirContents = (dir: string, level = 0) => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        console.log("  ".repeat(level) + "- " + item);
        if (fs.statSync(fullPath).isDirectory()) {
          listDirContents(fullPath, level + 1);
        }
      });
    };
    listDirContents(publicDir);

    // Serve static files with proper MIME types and caching
    app.use(express.static(publicDir, {
      index: false,
      etag: true,
      lastModified: true,
      setHeaders: (res: express.Response, path: string, stat: Stats) => {
        // Set strict MIME types for security
        if (path.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        } else if (path.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css; charset=utf-8');
        }

        // Set cache headers based on file type
        if (path.endsWith('.html')) {
          // Don't cache HTML files
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        } else {
          // Cache other static assets
          res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
      }
    }));

    // SPA route handler with improved error handling
    app.get('*', (req, res, next) => {
      if (req.url.startsWith('/api/')) {
        return next();
      }
      
      console.log(`Serving index.html for path: ${req.url}`);
      
      // Send the index.html file with proper error handling
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error('Error serving index.html:', err);
          res.status(500).send('Error loading the application');
        }
      });
    });
  } // Close the production block

  const PORT = parseInt(process.env.PORT || "5000", 10);
  const HOST = "0.0.0.0";
  
  // Check if port is in use and exit if it is
  server.on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please make sure no other server is running.`);
      process.exit(1);
    }
  });

  server.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT} in ${process.env.NODE_ENV} mode`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
