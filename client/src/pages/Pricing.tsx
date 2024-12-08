import { motion } from "framer-motion";
import { Suspense } from "react";
import PricingCard from "@/components/PricingCard";
import FAQSection from "@/components/FAQSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Testimonials from "@/components/Testimonials";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#123e74] via-[#2a9d8f]/80 to-[#123e74]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white/5" />
          <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-6 gap-4 p-4 opacity-20">
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                className="h-full bg-white rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1],
                  transition: {
                    duration: 3,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent
              <br />
              <span className="text-[#66b3ff] drop-shadow-lg">Pricing</span>
            </h1>
            <p className="text-xl text-slate-100 max-w-3xl mx-auto">
              Transform your sales process and build a high-performing SDR team with our proven two-step approach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-[#123e74]/10 to-[#2a9d8f]/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative">
                <PricingCard
                  step="1"
                  title="Sales System Setup"
                  price="2,000"
                  description="Complete implementation of your sales infrastructure within 3-6 months, including CRM setup, autoDialer, and essential tools."
                  features={[
                    "CRM and tech stack implementation",
                    "Integration of sales tools and data providers",
                    "Development of sales scripts and email templates",
                    "KPI tracking setup"
                  ]}
                  ctaText="Start with Step 1"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-[#2a9d8f]/10 to-[#e76f51]/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative">
                <PricingCard
                  step="2"
                  title="Build Your SDR Team"
                  price="3,000"
                  description="Build and transition to your own SDR team within 3-6 months, achieving 200% more meetings booked and 5x increase in outbound efforts."
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
            </motion.div>
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
  );
}
