import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";

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

// Enable CORS and security headers for all environments
app.use((req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Security headers
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

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

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  try {
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      console.log('Starting in production mode...');
      const clientDistPath = path.resolve(__dirname, '../client/dist');
      
      if (!fs.existsSync(clientDistPath)) {
        console.error(`Client dist directory not found at: ${clientDistPath}`);
        throw new Error('Build directory not found');
      }
      
      const indexPath = path.join(clientDistPath, 'index.html');
      if (!fs.existsSync(indexPath)) {
        console.error(`index.html not found at: ${indexPath}`);
        throw new Error('index.html not found');
      }
      
      console.log('Serving static files from:', clientDistPath);
      
      // Serve static files with proper headers and caching
      app.use(
        express.static(clientDistPath, {
          maxAge: '30d',
          etag: true,
          lastModified: true,
          setHeaders: (res, filePath) => {
            // Don't cache HTML files
            if (filePath.endsWith('.html')) {
              res.setHeader('Cache-Control', 'no-cache');
              res.setHeader('Pragma', 'no-cache');
              res.setHeader('Expires', '0');
            } else if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
              // Aggressive caching for assets
              res.setHeader('Cache-Control', 'public, max-age=31536000');
            }
            // Security headers
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('X-Frame-Options', 'DENY');
            res.setHeader('X-XSS-Protection', '1; mode=block');
          }
        })
      );
      
      // API routes with error handling
      app.use('/api', (req, res, next) => {
        console.log(`API request: ${req.method} ${req.path}`);
        next();
      });
      
      // SPA fallback with comprehensive error handling
      app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api')) {
          return next(); // Skip SPA handling for API routes
        }

        console.log(`[${new Date().toISOString()}] Serving index.html for: ${req.path}`);
        res.sendFile(indexPath, (err) => {
          if (err) {
            console.error(`[${new Date().toISOString()}] Error serving index.html: ${err.message}`);
            if (err.code === 'ENOENT') {
              res.status(404).send('Not found');
            } else {
              res.status(500).send('Internal server error');
            }
          }
        });
      });
    }
  } catch (error) {
    console.error('Server initialization error:', error);
    process.exit(1);
  }

  // Always use port 3000 and let Replit handle port forwarding
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const HOST = '0.0.0.0';
  
  function startServer() {
    return new Promise((resolve, reject) => {
      log(`attempting to start server in ${process.env.NODE_ENV || 'development'} mode on ${HOST}:${PORT}`);
      
      // Ensure any existing connections are terminated
      server.on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE') {
          log(`Port ${PORT} is already in use. Retrying in 3 seconds...`);
          setTimeout(() => {
            server.close();
            startServer().then(resolve).catch(reject);
          }, 3000);
        } else {
          log(`Server error: ${error.message}`);
          reject(error);
        }
      });

      const serverInstance = server.listen(PORT, HOST, () => {
        log(`server successfully listening on ${HOST}:${PORT}`);
        resolve(serverInstance);
      });

      // Handle process termination
      process.on('SIGTERM', () => {
        log('SIGTERM signal received: closing HTTP server');
        serverInstance.close(() => {
          log('HTTP server closed');
          process.exit(0);
        });
      });
    });
  }

  startServer().catch((error) => {
    log(`Failed to start server: ${error.message}`);
    process.exit(1);
  });
})();
