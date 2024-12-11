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

// Enable CORS for all environments
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
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
      
      // Serve static files with caching
      app.use(express.static(clientDistPath, {
        maxAge: '1h',
        index: false,
        etag: true
      }));
      
      // API routes
      app.use('/api', (req, res, next) => {
        console.log(`API request: ${req.method} ${req.path}`);
        next();
      });
      
      // SPA fallback
      app.get('*', (req, res) => {
        console.log(`Serving index.html for: ${req.path}`);
        res.sendFile(indexPath);
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
    log(`attempting to start server in ${process.env.NODE_ENV || 'development'} mode on ${HOST}:${PORT}`);
    
    const serverInstance = server.listen(PORT, HOST, () => {
      log(`server successfully listening on ${HOST}:${PORT}`);
    });

    serverInstance.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        log(`Port ${PORT} is already in use. Retrying in 5 seconds...`);
        setTimeout(() => {
          serverInstance.close();
          startServer();
        }, 5000);
      } else {
        log(`Failed to start server: ${error.message}`);
        process.exit(1);
      }
    });

    return serverInstance;
  }

  try {
    startServer();
  } catch (error) {
    log(`Unexpected error while starting server: ${error}`);
    process.exit(1);
  }
})();
