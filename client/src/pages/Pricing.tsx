import { motion } from "framer-motion";
import { Suspense } from "react";
import PricingCard from "@/components/PricingCard";
import FAQSection from "@/components/FAQSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Testimonials from "@/components/Testimonials";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import SEO from "@/components/SEO";

export default function PricingPage() {
  return (
    <>
      <SEO 
        title="Pricing - Sales System & SDR Team Building Solutions"
        description="Transform your sales process with our two-step approach: Sales System Setup ($2,000) and SDR Team Building ($3,000 per SDR). Clear, transparent pricing for comprehensive sales solutions."
        image="/pricing-preview.png"
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/5 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Simple, Transparent
                <br />
                <span className="text-[#0066CC]">Pricing</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Transform your sales process and build a high-performing SDR team with our proven two-step approach.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <PricingCard
                step="1"
                title="Sales System Setup"
                price="2,000"
                description="We optimize your existing sales infrastructure, working with your in-house team to set up essential tools and processes."
                features={[
                  "CRM and tech stack implementation",
                  "Integration of sales tools and data providers",
                  "Development of sales scripts and email templates",
                  "KPI tracking setup"
                ]}
                ctaText="Start with Step 1"
              />
              <PricingCard
                step="2"
                title="Build Your SDR Team"
                price="3,000"
                description="We help you scale by building a dedicated Sales Development Representative (SDR) team."
                features={[
                  "SDR recruitment and onboarding",
                  "Fractional sales management",
                  "Ongoing training and support",
                  "Performance monitoring"
                ]}
                ctaText="Expand with Step 2"
                perSdr={true}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </>
  );
}
