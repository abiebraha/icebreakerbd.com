import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function log(message: string) {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [express] ${message}`);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  registerRoutes(app);
  const server = createServer(app);

  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error('Server Error:', {
      status,
      message,
      path: req.path,
      stack: err.stack,
      originalError: err
    });
    
    // Send appropriate response based on the request type
    if (req.accepts('html') && !req.path.startsWith('/api')) {
      const indexPath = path.join(__dirname, '../dist/public/index.html');
      log(`Attempting to serve index.html from ${indexPath} for error fallback`);
      res.status(200).sendFile(indexPath, (err) => {
        if (err) {
          console.error('Error serving index.html:', err);
          res.status(500).send('Error loading page');
        }
      });
    } else {
      res.status(status).json({ message });
    }
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  log(`Current environment: ${app.get('env')}`);
  log(`NODE_ENV: ${process.env.NODE_ENV}`);
  
  if (app.get("env") === "development") {
    log('Starting in development mode with Vite middleware');
    await setupVite(app, server);
  } else {
    log('Starting in production mode');
    const distDir = path.join(__dirname, '../dist/public');
    const indexPath = path.join(distDir, 'index.html');
    
    try {
      const fs = await import('fs');
      if (!fs.existsSync(distDir)) {
        log(`WARNING: Build directory ${distDir} does not exist!`);
        throw new Error('Build directory not found - run npm run build first');
      }
      
      // Verify index.html exists
      if (!fs.existsSync(indexPath)) {
        log(`WARNING: index.html not found at ${indexPath}`);
        throw new Error('index.html not found - build may be incomplete');
      }
      
      log(`Serving static files from: ${distDir}`);
      
      // Serve static files first
      app.use(express.static(distDir, {
        maxAge: '1d',
        etag: true,
        index: false,
        lastModified: true
      }));
      
      // Then handle all other routes for client-side routing
      app.get('*', (req, res, next) => {
        // Skip API routes
        if (req.path.startsWith('/api')) {
          return next();
        }
        
        // Skip static assets
        if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
          return next();
        }
        
        log(`Serving index.html for route: ${req.path}`);
        res.sendFile(indexPath, (err) => {
          if (err) {
            log(`Error serving index.html: ${err}`);
            next(err);
          }
        });
      });
    } catch (error) {
      log(`Critical error with static files: ${error}`);
      throw error;
    }
  }

  // Default to port 3000 if not specified
  const PORT = parseInt(process.env.PORT || '3000', 10);
  server.listen(PORT, '0.0.0.0', () => {
    log(`Server is running on port ${PORT} in ${app.get('env')} mode`);
  });
})();