import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite } from "./vite";
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
    
    log(`Error handling request to ${req.path}: ${JSON.stringify({
      status,
      message,
      error: err.stack || err
    })}`);

    if (req.path.startsWith('/api')) {
      res.status(status).json({ message });
      return;
    }

    // For non-API routes, always try to serve index.html
    const indexPath = path.join(__dirname, '../dist/public/index.html');
    log(`Serving index.html for path: ${req.path}`);
    res.sendFile(indexPath, (err) => {
      if (err) {
        log(`Failed to serve index.html: ${err.message}`);
        res.status(500).send('Internal Server Error');
      }
    });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  log(`Current environment: ${app.get('env')}`);
  log(`NODE_ENV: ${process.env.NODE_ENV}`);
  
  const isDev = app.get("env") === "development";
  log(`Starting server in ${isDev ? 'development' : 'production'} mode`);
  
  if (isDev) {
    await setupVite(app, server);
  } else {
    const distDir = path.join(__dirname, '../dist/public');
    const indexPath = path.join(distDir, 'index.html');
    
    try {
      // Ensure build directory exists
      const fs = await import('fs');
      if (!fs.existsSync(distDir)) {
        throw new Error(`Build directory not found at ${distDir}. Run 'npm run build' first.`);
      }
      if (!fs.existsSync(indexPath)) {
        throw new Error(`index.html not found at ${indexPath}. Build may be incomplete.`);
      }

      log(`Serving static files from: ${distDir}`);
      
      // Serve static assets with strong caching
      app.use('/assets', express.static(path.join(distDir, 'assets'), {
        maxAge: '1y',
        immutable: true
      }));

      // Serve other static files with standard caching
      app.use(express.static(distDir, {
        index: false,
        maxAge: '1d'
      }));
      
      // Handle all non-API routes for client-side routing
      app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api')) {
          return next();
        }

        // Skip if requesting an actual file
        if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json|map)$/)) {
          return next();
        }

        log(`[SPA] Serving index.html for: ${req.path}`);
        res.sendFile(indexPath, (err) => {
          if (err) {
            log(`[ERROR] Failed to serve index.html for ${req.path}: ${err.message}`);
            res.status(500).send('Internal Server Error');
          }
        });
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      log(`Failed to initialize production server: ${errorMessage}`);
      process.exit(1);
    }
  }

  // Default to port 3000 if not specified
  const PORT = parseInt(process.env.PORT || '3000', 10);
  server.listen(PORT, '0.0.0.0', () => {
    log(`Server is running on port ${PORT} in ${app.get('env')} mode`);
  });
})();