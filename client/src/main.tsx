import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route, Link, Router as WouterRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { queryClient } from "./lib/queryClient";

// Import CSS after components to avoid circular dependencies
import "./index.css";

// Lazy load all pages to improve initial load time
const Home = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const ServicesPage = lazy(() => import("./pages/Services"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudies"));
const PricingPage = lazy(() => import("./pages/Pricing"));
const ContactPage = lazy(() => import("./pages/Contact"));
const ROICalculator = lazy(() => import("./pages/ROICalculator"));
const ScheduleCallPage = lazy(() => import("./pages/ScheduleCall"));
const ColdEmailGenerator = lazy(() => import("./pages/tools/ColdEmailGenerator"));
const SalesScriptGenerator = lazy(() => import("./pages/tools/SalesScriptGenerator"));
const LinkedInPostGenerator = lazy(() => import("./pages/tools/LinkedInPostGenerator"));

console.log("Application initialization started");

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#123e74]"></div>
  </div>
);

function Router() {
  return (
    <WouterRouter base="/">
      <ErrorBoundary>
        <Layout>
          <ScrollToTop />
          <Suspense fallback={<LoadingSpinner />}>
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
              <Route path="*">
                {(params) => (
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-[#123e74] mb-4">404</h1>
                      <p className="text-slate-600 mb-6">Page not found: {params['*']}</p>
                      <Link href="/">
                        <span className="text-[#123e74] hover:text-[#1a4e8f] transition-colors cursor-pointer">
                          Go back home
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </Route>
            </Switch>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </WouterRouter>
  );
}

// Initialize the application
(() => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Failed to find root element");
    return;
  }

  console.log("Root element found, initializing React application");
  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <Router />
          <Toaster />
        </QueryClientProvider>
      </ErrorBoundary>
    </StrictMode>
  );
  
  console.log("React application rendered successfully");
})();
