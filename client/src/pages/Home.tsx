import { useState, Suspense } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, LineChart, Target } from "lucide-react";

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
        <MouseEffect />
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

        {/* Mouse Effect moved to be scoped to hero section */}
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
            <a 
              href="https://calendly.com/icebreakerbd/meeting-with-abie-braha" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="gap-2 bg-[#123e74] hover:bg-[#1a4e8f] transition-all duration-300 hover:scale-105"
              >
                Let's Talk
              </Button>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* About Our Business Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Transforming Sales Development
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We specialize in revolutionizing sales processes and building high-performing SDR teams that drive exceptional results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-[#123e74] mb-4">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Team Building</h3>
              <p className="text-slate-600">
                We help you build and scale high-performing SDR teams that consistently deliver results and drive growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-[#123e74] mb-4">
                <LineChart className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Process Optimization</h3>
              <p className="text-slate-600">
                Streamline your sales operations with our proven methodologies and cutting-edge tools.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-[#123e74] mb-4">
                <Target className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Growth Strategy</h3>
              <p className="text-slate-600">
                Develop and implement targeted strategies that accelerate your sales growth and market presence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Why Choose Our Approach?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our proven methodology has helped companies across various industries achieve remarkable growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "150%", label: "Average Increase in Qualified Leads" },
              { number: "45%", label: "Improvement in Conversion Rates" },
              { number: "60%", label: "Faster Sales Cycle" },
              { number: "90%", label: "Client Satisfaction Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#123e74]">{stat.number}</span>
                </div>
                <p className="text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              How Our Process Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A systematic approach to transforming your sales operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="relative p-8 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#123e74] text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Sales System Setup</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-[#123e74] rounded-full" />
                  Complete CRM implementation and optimization
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-[#123e74] rounded-full" />
                  Integration of essential sales tools
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-[#123e74] rounded-full" />
                  Automated workflow creation
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-[#123e74] rounded-full" />
                  Performance tracking setup
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="relative p-8 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#123e74] text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">SDR Team Building</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-[#123e74] rounded-full" />
                  Strategic talent acquisition
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-[#123e74] rounded-full" />
                  Comprehensive training program
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-[#123e74] rounded-full" />
                  Performance management
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-[#123e74] rounded-full" />
                  Ongoing optimization
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      

      </div>
  );
}
