import { Button } from "@/components/ui/button";
import PricingCard from "../components/PricingCard";
import FAQSection from "../components/FAQSection";
import ContactForm from "../components/ContactForm";
import Testimonials from "../components/Testimonials";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-b from-slate-50 to-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(18,62,116,0.03) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <div className="max-w-7xl mx-auto text-center relative">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-slate-900 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Accelerate Your Sales Growth in Two Steps
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transform your sales process and build a high-performing SDR team with our proven two-step approach.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('pricing')}
              className="gap-2 bg-[#123e74] hover:bg-[#1a4e8f] transition-all duration-300 hover:scale-105"
            >
              View Pricing <ArrowDown size={16} className="animate-bounce" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Pricing Model</h2>
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

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <section id="contact" className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Get Started Today</h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
