import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, LineChart, Target } from "lucide-react";
import MouseEffect from "@/components/MouseEffect";

export default function Home() {
  const { scrollY } = useScroll();
  
  // Create scroll-based animations
  const backgroundOpacity = useTransform(
    scrollY,
    [0, 300],
    ["rgba(255, 255, 255, 1)", "rgba(232, 240, 255, 1)"]
  );
  
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const heroY = useTransform(scrollY, [0, 300], [0, 50]);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        className="min-h-screen relative overflow-hidden flex items-center justify-center py-20"
        style={{ 
          background: backgroundOpacity,
          scale: heroScale,
          y: heroY
        }}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              <motion.span
                className="inline-block bg-gradient-to-r from-[#123e74] via-[#1a4e8f] to-[#123e74] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Accelerate Your Sales Growth
              </motion.span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-[#1a4e8f] via-[#123e74] to-[#1a4e8f] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                in Two Simple Steps
              </motion.span>
            </h1>
            <motion.p 
              className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transform your sales process and build a high-performing SDR team with our proven two-step approach.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="gap-2 bg-[#123e74] hover:bg-[#1a4e8f] transition-all duration-300 hover:scale-105"
                onClick={() => window.open(import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/icebreakerbd/meeting-with-abie-braha", "_blank")}
              >
                Let's Talk
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background: useTransform(
            scrollY,
            [300, 600],
            ["rgb(255, 255, 255)", "rgb(248, 250, 252)"]
          )
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Our Core Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive solutions to transform your sales operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Team Building",
                description: "Build and scale high-performing SDR teams that consistently deliver results."
              },
              {
                icon: LineChart,
                title: "Process Optimization",
                description: "Streamline your sales operations with proven methodologies."
              },
              {
                icon: Target,
                title: "Growth Strategy",
                description: "Develop targeted strategies that accelerate your sales growth."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div 
                  className="text-[#123e74] mb-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <feature.icon className="w-12 h-12" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background: useTransform(
            scrollY,
            [600, 900],
            ["rgb(248, 250, 252)", "rgb(240, 245, 255)"]
          )
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Proven Results
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our track record speaks for itself
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { number: "150%", label: "Average Increase in Qualified Leads" },
              { number: "45%", label: "Improvement in Conversion Rates" },
              { number: "60%", label: "Faster Sales Cycle" },
              { number: "90%", label: "Client Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    bounce: 0.4,
                    duration: 1,
                    delay: index * 0.2
                  }
                }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="mb-4 relative"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  <motion.span 
                    className="text-4xl font-bold bg-gradient-to-r from-[#123e74] via-[#1a4e8f] to-[#123e74] text-transparent bg-clip-text"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    {stat.number}
                  </motion.span>
                </motion.div>
                <p className="text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          background: useTransform(
            scrollY,
            [900, 1200],
            ["rgb(240, 245, 255)", "rgb(255, 255, 255)"]
          )
        }}
      >
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Ready to Transform Your Sales Process?
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                size="lg"
                className="gap-2 bg-[#123e74] hover:bg-[#1a4e8f] transition-all duration-300 hover:scale-105"
                onClick={() => window.open(import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/icebreakerbd/meeting-with-abie-braha", "_blank")}
              >
                Schedule a Call
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
