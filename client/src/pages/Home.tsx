import { Button } from "@/components/ui/button";
import PricingCard from "../components/PricingCard";
import FAQSection from "../components/FAQSection";
import ContactForm from "../components/ContactForm";
import Testimonials from "../components/Testimonials";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Home() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-b from-slate-50 to-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[80vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: (i % 2 ? 60 : 40) + 'px',
                height: (i % 2 ? 60 : 40) + 'px',
                left: (i * 20) + '%',
                top: (i * 15) + '%',
                background: i % 3 === 0 ? '#123e74' : 'transparent',
                border: i % 3 !== 0 ? '2px solid #123e74' : 'none',
                borderRadius: i % 3 === 1 ? '0%' : '50%',
                opacity: 0.1,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Parallax Layers */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{
            y: useTransform(useScroll().scrollY, [0, 1000], [0, 400]),
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at ${20 + i * 30}% ${20 + i * 20}%, rgba(18,62,116,${0.05 - i * 0.01}) 0%, transparent ${40 + i * 10}%)`,
                transform: `translateZ(${i * 10}px)`,
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>

        {/* Mouse Follow Effect */}
        <motion.div
          className="absolute w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(18,62,116,0.1) 0%, transparent 70%)",
          }}
          animate={{
            x: useMotionValue(0),
            y: useMotionValue(0),
          }}
          whileHover={{
            scale: 1.2,
          }}
        />
        <div className="max-w-7xl mx-auto text-center relative">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-slate-900 mb-6"
            initial={{ opacity: 1 }}
          >
            {/* Typing animation for the headline */}
            <motion.div className="relative inline-block">
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.43, 0.13, 0.23, 0.96],
                  bounce: 0.4 
                }}
                className="inline-block whitespace-nowrap overflow-hidden"
              >
                Accelerate Your Sales Growth
              </motion.span>
              <motion.div
                className="absolute right-0 top-0 h-full w-1 bg-[#123e74]"
                animate={{
                  opacity: [1, 0],
                  scaleY: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <br />
            <motion.div className="relative inline-block">
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 1, 
                  ease: [0.43, 0.13, 0.23, 0.96], 
                  delay: 1.5,
                  bounce: 0.4 
                }}
                className="inline-block whitespace-nowrap overflow-hidden"
              >
                in Two Steps
              </motion.span>
              <motion.div
                className="absolute right-0 top-0 h-full w-1 bg-[#123e74]"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [1, 0],
                  scaleY: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2.5,
                }}
              />
            </motion.div>
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
