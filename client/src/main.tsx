import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Home from "./pages/Home";

console.log("Application initialization started");

function Router() {
  return (
    <ErrorBoundary>
      <Switch>
        <Route path="/">
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        </Route>
        <Route>404 Page Not Found</Route>
      </Switch>
    </ErrorBoundary>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Failed to find root element");
} else {
  console.log("Root element found, initializing React application");
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <Router />
            <Toaster />
          </QueryClientProvider>
        </ErrorBoundary>
      </StrictMode>,
    );
    console.log("React application rendered successfully");
  } catch (error) {
    console.error("Failed to render React application:", error);
  }
}
