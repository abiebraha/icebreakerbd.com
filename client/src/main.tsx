import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route, Link } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";

import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import CaseStudiesPage from "./pages/CaseStudies";
import PricingPage from "./pages/Pricing";
import ContactPage from "./pages/Contact";
import ROICalculator from "./pages/ROICalculator";
import ScheduleCallPage from "./pages/ScheduleCall";
import ColdEmailGenerator from "./pages/tools/ColdEmailGenerator";
import SalesScriptGenerator from "./pages/tools/SalesScriptGenerator";
import LinkedInPostGenerator from "./pages/tools/LinkedInPostGenerator";

console.log("Application initialization started");

function Router() {
  return (
    <ErrorBoundary>
      <Layout>
        <ScrollToTop />
        <Switch>
          <Route path="/">
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          </Route>
          <Route path="/about">
            <ErrorBoundary>
              <AboutPage />
            </ErrorBoundary>
          </Route>
          <Route path="/services">
            <ErrorBoundary>
              <ServicesPage />
            </ErrorBoundary>
          </Route>
          <Route path="/case-studies">
            <ErrorBoundary>
              <CaseStudiesPage />
            </ErrorBoundary>
          </Route>
          <Route path="/pricing">
            <ErrorBoundary>
              <PricingPage />
            </ErrorBoundary>
          </Route>
          <Route path="/contact">
            <ErrorBoundary>
              <ContactPage />
            </ErrorBoundary>
          </Route>
          <Route path="/roi-calculator">
            <ErrorBoundary>
              <ROICalculator />
            </ErrorBoundary>
          </Route>
          <Route path="/schedule-call">
            <ErrorBoundary>
              <ScheduleCallPage />
            </ErrorBoundary>
          </Route>
          <Route path="/tools/cold-email">
            <ErrorBoundary>
              <ColdEmailGenerator />
            </ErrorBoundary>
          </Route>
          <Route path="/tools/sales-script">
            <ErrorBoundary>
              <SalesScriptGenerator />
            </ErrorBoundary>
          </Route>
          <Route path="/tools/linkedin-post">
            <ErrorBoundary>
              <LinkedInPostGenerator />
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
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <Router />
              <Toaster />
            </QueryClientProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </StrictMode>,
    );
    console.log("React application rendered successfully");
  } catch (error) {
    console.error("Failed to render React application:", error);
  }
}
