import express, { type Request, Response, NextFunction } from "express";
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

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Try port 80 first, fallback to 3001 if not available
  let PORT = 80;
  
  const startServer = (port: number) => {
    try {
      server.listen(port, '0.0.0.0', () => {
        log(`Server is running at http://0.0.0.0:${port}`);
        log(`Local development server started on port ${port}`);
      }).on('error', (err: NodeJS.ErrnoException) => {
        if (err.code === 'EACCES' && port === 80) {
          log('Permission denied for port 80, falling back to port 3001');
          startServer(3001);
        } else if (err.code === 'EADDRINUSE') {
          log(`Port ${port} is already in use. Trying next available port.`);
          startServer(port + 1);
        } else {
          log(`Failed to start server: ${err.message}`);
          throw err;
        }
      });
    } catch (error) {
      log(`Failed to start server: ${(error as Error).message}`);
      process.exit(1);
    }
  };

  // Start server with initial port
  startServer(PORT);
})();
