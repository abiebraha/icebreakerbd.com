import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

function log(message: string) {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [express] ${message}`);
}

// Initialize Express app with proper error handling
const app = express();

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Capture JSON responses for logging
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  // Log completed requests
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
  try {
    // Register routes first
    registerRoutes(app);
    const server = createServer(app);

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`Error: ${message}`);
      res.status(status).json({ message });
    });

    // Set up Vite or static serving based on environment
    if (process.env.NODE_ENV === "development") {
      log("Setting up Vite for development");
      await setupVite(app, server);
    } else {
      log("Setting up static file serving for production");
      serveStatic(app);
    }

    // Configure port based on environment
    const PORT = process.env.NODE_ENV === 'production' 
      ? parseInt(process.env.PORT || "80", 10)
      : parseInt(process.env.PORT || "3000", 10);

    // Log startup configuration
    log('Starting server with configuration:');
    log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    log(`Port: ${PORT}`);
    log(`OpenAI API Key: ${process.env.OPENAI_API_KEY ? 'Configured' : 'Missing'}`);
    
    let retries = 0;
    const maxRetries = 3;
    
    const startServer = () => {
      try {
        const serverInstance = server.listen(PORT, "0.0.0.0", () => {
          log(`Server is running on port ${PORT}`);
        });

        // Handle server errors
        serverInstance.on('error', (error: any) => {
          if (error.code === 'EADDRINUSE') {
            log(`Port ${PORT} is already in use`);
            if (retries < maxRetries) {
              retries++;
              log(`Retrying in 1 second... (Attempt ${retries}/${maxRetries})`);
              setTimeout(startServer, 1000);
            } else {
              log('Max retries reached. Exiting...');
              process.exit(1);
            }
          } else {
            log(`Server error: ${error.message}`);
            process.exit(1);
          }
        });

        // Graceful shutdown
        const shutdown = () => {
          log('Shutting down gracefully...');
          serverInstance.close(() => {
            log('Server closed');
            process.exit(0);
          });

          // Force close if graceful shutdown fails
          setTimeout(() => {
            log('Could not close connections in time, forcefully shutting down');
            process.exit(1);
          }, 10000);
        };

        // Handle termination signals
        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);

      } catch (error) {
        log(`Failed to start server: ${error instanceof Error ? error.message : 'Unknown error'}`);
        process.exit(1);
      }
    };

    // Start the server
    startServer();
  } catch (error) {
    log(`Fatal error during server initialization: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
})();
