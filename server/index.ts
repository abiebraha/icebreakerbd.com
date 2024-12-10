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

  // Default to port 80 for production, with fallback ports if needed
  const PRIMARY_PORT = process.env.NODE_ENV === 'production' ? 80 : 5000;
  const FALLBACK_PORT = 3000;
  const HOST = '0.0.0.0';
  
  const PORT = parseInt(process.env.PORT || PRIMARY_PORT.toString(), 10);
  
  log(`attempting to start server in ${process.env.NODE_ENV || 'development'} mode on ${HOST}:${PORT}`);
  
  // Function to start server on a specific port
  const startServer = (port: number) => {
    return new Promise<void>((resolve, reject) => {
      server.listen(port, HOST, () => {
        log(`server successfully listening on ${HOST}:${port}`);
        resolve();
      }).on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EACCES' || error.code === 'EADDRINUSE') {
          log(`failed to bind to port ${port}: ${error.code}`);
          reject(error);
        } else {
          log(`server error: ${error}`);
          process.exit(1);
        }
      });
    });
  };

  // Try to start server on primary port, fall back to alternate if needed
  (async () => {
    try {
      await startServer(PORT);
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        log(`attempting to start server on fallback port ${FALLBACK_PORT}`);
        try {
          await startServer(FALLBACK_PORT);
        } catch (fallbackError) {
          log(`failed to start server on fallback port: ${fallbackError}`);
          process.exit(1);
        }
      } else {
        process.exit(1);
      }
    }
  })();
})();
