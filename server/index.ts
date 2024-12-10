import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import path from "path";

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
      stack: err.stack,
      originalError: err
    });
    
    // Send appropriate response based on the request type
    if (req.accepts('html')) {
      res.status(status).sendFile(path.join(__dirname, '../dist/public/index.html'), (err) => {
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
    // Serve static files from the built client
    const publicDir = path.resolve(__dirname, '../dist/public');
    log(`Attempting to serve static files from: ${publicDir}`);
    
    // Check if the directory exists and list contents
    try {
      const fs = await import('fs');
      if (!fs.existsSync(publicDir)) {
        log(`WARNING: Static directory ${publicDir} does not exist!`);
        throw new Error('Static directory not found - build may be missing');
      }
      
      // List contents of the directory
      const files = fs.readdirSync(publicDir);
      log(`Contents of ${publicDir}:`);
      files.forEach(file => {
        const filePath = path.join(publicDir, file);
        const stats = fs.statSync(filePath);
        log(`- ${file} (${stats.isDirectory() ? 'directory' : 'file'}, ${stats.size} bytes)`);
      });
      
      // Verify index.html exists
      const indexPath = path.join(publicDir, 'index.html');
      if (!fs.existsSync(indexPath)) {
        throw new Error('index.html not found in build directory');
      }
      
      // Serve static files with proper caching
      app.use('/', express.static(publicDir, {
        maxAge: '1y',
        etag: true,
        index: false // We'll handle serving index.html ourselves
      }));
      
      // Handle all routes for client-side routing
      app.get('*', (req, res) => {
        // Don't serve index.html for API routes
        if (req.path.startsWith('/api')) {
          res.status(404).send('Not found');
          return;
        }
        
        log(`Serving index.html for client-side route: ${req.path}`);
        res.sendFile(indexPath);
      });
      
    } catch (error) {
      log(`Critical error with static files: ${error}`);
      // Let the error handler deal with it
      throw error;
    }
    
    log(`Static files will be served from: ${publicDir}`);
  }

  // Default to port 3000 if not specified
  const PORT = parseInt(process.env.PORT || '3000', 10);
  server.listen(PORT, '0.0.0.0', () => {
    log(`Server is running on port ${PORT} in ${app.get('env')} mode`);
  });
})();