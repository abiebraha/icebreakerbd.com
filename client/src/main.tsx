import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "./pages/Home";

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route>404 Page Not Found</Route>
      </Switch>
    </>
  );
}

// Create root only if it doesn't exist
const rootElement = document.getElementById("root");
if (!rootElement?.hasChildNodes()) {
  createRoot(rootElement!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </StrictMode>,
  );
}
