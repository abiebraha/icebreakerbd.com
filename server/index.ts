// Update port configuration to always use port 80 in production
const PORT = process.env.NODE_ENV === 'production' ? 80 : parseInt(process.env.PORT || "3000", 10);

// Update static file serving path
const distPath = path.resolve(__dirname, "..", "client", "dist");
if (process.env.NODE_ENV === 'production') {
  if (!fs.existsSync(distPath)) {
    log("Building client files for production...");
    await new Promise((resolve, reject) => {
      exec('npm run build', {
        cwd: path.resolve(__dirname, "..", "client") // Specify client directory for build
      }, (error, stdout, stderr) => {
        if (error) {
          log(`Build failed: ${error.message}`);
          reject(error);
          return;
        }
        log("Build completed successfully");
        resolve(stdout);
      });
    });
  }
  app.use(express.static(distPath));
  // Serve index.html for all routes to support client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}{
  "name": "sales-platform",
  "scripts": {
    "build": "cd client && npm install && npm run build",
    "start": "node server/index.js"
  },
  "engines": {
    "node": ">=14"
  }
}run = "npm start"
[env]
PORT = "80"

[nix]
channel = "stable-22_11"

[deployment]
run = ["sh", "-c", "npm start"]
build = ["sh", "-c", "npm run build"]
publicDir = "client/dist"// Before (problematic code):
  app.use(express.static(distPath));
  // Serve index.html for all routes to support client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}{ // <- This is the problematic part
  "name": "sales-platform",
  "scripts": {
    // ...
  }
}

// After (fixed code):
  app.use(express.static(distPath));
  // Serve index.html for all routes to support client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });const PORT = process.env.NODE_ENV === 'production' ? 80 : parseInt(process.env.PORT || "3000", 10);
const distPath = path.resolve(__dirname, "..", "client", "dist");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));// Fix for lines 29-33
const app = express();

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
  next();
}); // Add missing semicolon here

// Fix for lines 54-55
if (process.env.NODE_ENV === "development") {
  log("Setting up Vite for development");
  await setupVite(app, server);
} else {
  // Ensure client is built before starting production server
  try {
    // ... rest of the code
  } catch (error) {
    log(`Failed to prepare static files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
} // Add missing semicolon here// Add missing semicolons for the imports
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from 'dotenv';

// Add semicolons for constant declarations
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Add semicolons for middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add semicolon after middleware function
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  next();
});

// Add semicolons after conditional blocks
if (process.env.NODE_ENV === "development") {
  log("Setting up Vite for development");
  await setupVite(app, server);
} else {
  try {
    // Ensure client is built before starting production server
    const distPath = path.resolve(__dirname, "..", "dist", "public");
    if (!fs.existsSync(distPath)) {
      log("Building client files for production...");
      await new Promise((resolve, reject) => {
        exec('npm run build', (error, stdout, stderr) => {
          if (error) {
            log(`Build failed: ${error.message}`);
            reject(error);
            return;
          }
          log("Build completed successfully");
          resolve(stdout);
        });
      });
    }
    log("Setting up static file serving for production");
    serveStatic(app);
  } catch (error) {
    log(`Failed to prepare static files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};// Import statements with semicolons
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from 'dotenv';

// Load environment variables with semicolon
dotenv.config();

// Function declaration with semicolon
function log(message: string) {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [express] ${message}`);
}

// Constants with semicolons
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Middleware setup with semicolons
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware with semicolon
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
      log(logLine);
    }
  });

  next();
});

// Error handler with semicolon
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  log(`Error: ${message}`);
  res.status(status).json({ message });
});

// Conditional blocks with semicolons
if (process.env.NODE_ENV === "development") {
  log("Setting up Vite for development");
  await setupVite(app, server);
} else {
  try {
    const distPath = path.resolve(__dirname, "..", "dist", "public");
    if (!fs.existsSync(distPath)) {
      log("Building client files for production...");
      await new Promise((resolve, reject) => {
        exec('npm run build', (error, stdout, stderr) => {
          if (error) {
            log(`Build failed: ${error.message}`);
            reject(error);
            return;
          }
          log("Build completed successfully");
          resolve(stdout);
        });
      });
    }
    log("Setting up static file serving for production");
    serveStatic(app);
  } catch (error) {
    log(`Failed to prepare static files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
}

// Port configuration with semicolon
const PORT = process.env.NODE_ENV === 'production' ? 
  parseInt(process.env.PORT || "80", 10) : 
  parseInt(process.env.PORT || "3000", 10);

// Server startup with semicolon
server.listen(PORT, () => {
  log(`Server running on port ${PORT}`);
});import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
      // Ensure client is built before starting production server
      try {
        const distPath = path.resolve(__dirname, "..", "dist", "public");
        if (!fs.existsSync(distPath)) {
          log("Building client files for production...");
          await new Promise((resolve, reject) => {
            exec('npm run build', (error, stdout, stderr) => {
              if (error) {
                log(`Build failed: ${error.message}`);
                reject(error);
                return;
              }
              log("Build completed successfully");
              resolve(stdout);
            });
          });
        }
        log("Setting up static file serving for production");
        serveStatic(app);
      } catch (error) {
        log(`Failed to prepare static files: ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw error;
      }
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
    log(`Static files path: ${path.resolve(__dirname, "..", "dist", "public")}`);
    
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
