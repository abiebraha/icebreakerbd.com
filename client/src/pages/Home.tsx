import { useState, Suspense } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import PricingCard from "@/components/PricingCard";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";

import MouseEffect from "@/components/MouseEffect";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="overflow-x-hidden">
      <motion.section 
        className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Enhanced 3D Perspective Grid Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#123e74]/5 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0" style={{ perspective: "2000px" }}>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`grid-${i}`}
                className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#123e74]/15 to-transparent"
                style={{
                  top: `${(i + 1) * 6.66}%`,
                  transform: "rotateX(75deg)",
                }}
                animate={{
                  scaleX: [0.9, 1.1, 0.9],
                  opacity: [0.15, 0.3, 0.15],
                  z: [0, 50, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`grid-v-${i}`}
                className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#123e74]/15 to-transparent"
                style={{
                  left: `${(i + 1) * 6.66}%`,
                  transform: "rotateY(-75deg)",
                }}
                animate={{
                  scaleY: [0.9, 1.1, 0.9],
                  opacity: [0.15, 0.3, 0.15],
                  z: [0, 50, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Wave Animations */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute w-[200%] h-[50px] left-[-50%]"
              style={{
                top: `${30 + i * 15}%`,
                background: `linear-gradient(90deg, transparent, rgba(18,62,116,${0.04 - i * 0.01}) 50%, transparent)`,
                transform: 'rotate(-5deg)',
              }}
              animate={{
                x: [0, -100, 0],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Dynamic Particle System */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: '#123e74',
              opacity: 0.2,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Light Beam Effects */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`beam-${i}`}
              className="absolute w-[1px] h-[200%] bg-gradient-to-b from-transparent via-[#123e74]/20 to-transparent"
              style={{
                left: '50%',
                top: '-50%',
                transform: `rotate(${45 + i * 90}deg)`,
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [1, 1.2, 1],
                x: [-500, 500],
              }}
              transition={{
                duration: 7 + i * 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 3.5,
              }}
            />
          ))}
        </motion.div>

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

        {/* Enhanced Mouse Effect */}
        <MouseEffect />
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
                className="inline-block whitespace-nowrap overflow-hidden bg-gradient-to-r from-[#123e74] via-[#1a4e8f] to-[#123e74] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
              >
                Accelerate Your Sales Growth
              </motion.span>
              <motion.div
                className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-[#123e74] to-[#1a4e8f]"
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
                className="inline-block whitespace-nowrap overflow-hidden bg-gradient-to-r from-[#1a4e8f] via-[#123e74] to-[#1a4e8f] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-reverse"
              >
                in Two Steps
              </motion.span>
              <motion.div
                className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-[#1a4e8f] to-[#123e74]"
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
      <section id="pricing" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Pricing Model</h2>
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
      <ErrorBoundary>
        <Suspense fallback={<div className="p-12 text-center">Loading testimonials...</div>}>
          <Testimonials />
        </Suspense>
      </ErrorBoundary>

      {/* FAQ Section */}
      <ErrorBoundary>
        <Suspense fallback={<div className="p-12 text-center">Loading FAQ...</div>}>
          <FAQSection />
        </Suspense>
      </ErrorBoundary>

      
    </div>
  );
}
