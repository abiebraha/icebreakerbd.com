import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route, Link } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import "./index.css";

import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import CaseStudiesPage from "./pages/CaseStudies";
import PricingPage from "./pages/Pricing";
import ContactPage from "./pages/Contact";
import ROICalculator from "./pages/ROICalculator";

console.log("Application initialization started");

function Router() {
  return (
    <ErrorBoundary>
      <Layout>
        <Switch>
          <Route path="/">
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          </Route>
          <Route path="/about">
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <AboutPage />
              </Suspense>
            </ErrorBoundary>
          </Route>
          <Route path="/services">
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <ServicesPage />
              </Suspense>
            </ErrorBoundary>
          </Route>
          <Route path="/case-studies">
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <CaseStudiesPage />
              </Suspense>
            </ErrorBoundary>
          </Route>
          <Route path="/pricing">
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <PricingPage />
              </Suspense>
            </ErrorBoundary>
          </Route>
          <Route path="/contact">
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <ContactPage />
              </Suspense>
            </ErrorBoundary>
          </Route>
          <Route path="/roi-calculator">
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <ROICalculator />
              </Suspense>
            </ErrorBoundary>
          </Route>
          <Route>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-[#123e74] mb-4">404</h1>
                <p className="text-slate-600 mb-6">Page not found</p>
                <Link href="/">
                  <a className="text-[#123e74] hover:text-[#1a4e8f] transition-colors">
                    Go back home
                  </a>
                </Link>
              </div>
            </div>
          </Route>
        </Switch>
      </Layout>
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
