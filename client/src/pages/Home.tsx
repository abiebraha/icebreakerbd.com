import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, LineChart, Target, Plus, Minus } from "lucide-react";

// Add custom styles
import "./styles.css";

export default function Home() {
  const { scrollY } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Enhanced spring animations for Apple-like smooth transitions
  const springConfig = { 
    stiffness: 50,
    damping: 20,
    mass: 1.5
  };
  
  // Hero animations
  const heroY = useSpring(
    useTransform(scrollY, [0, 1000], [0, -300]),
    springConfig
  );
  
  const heroScale = useSpring(
    useTransform(scrollY, [0, 1000], [1, 0.95]),
    springConfig
  );
  
  const heroOpacity = useSpring(
    useTransform(scrollY, [0, 500], [1, 0]),
    springConfig
  );

  // Features animations with enhanced parallax
  const featuresY = useSpring(
    useTransform(scrollY, [300, 1200], [200, -100]),
    springConfig
  );
  
  // Stats animations
  const statsY = useSpring(
    useTransform(scrollY, [600, 1400], [200, -50]),
    springConfig
  );
  
  // Text reveal animations
  const textReveal = useSpring(
    useTransform(scrollY, [100, 500], [50, 0]),
    springConfig
  );

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#123e74] text-white"
        style={{ 
          y: heroY,
          scale: heroScale,
          opacity: heroOpacity
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-7xl md:text-[120px] font-bold mb-6 tracking-tight leading-none flex flex-col items-center">
              <motion.span
                className="text-white"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Accelerate Your
              </motion.span>
              <motion.span
                className="text-white"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Sales Growth
              </motion.span>
            </h1>
            <motion.p 
              className="text-2xl md:text-3xl text-white mb-8 max-w-3xl mx-auto font-medium tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              With Our Proven Two-Step Approach
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <Link href="/schedule-call">
                <Button
                  size="lg"
                  className="bg-white hover:bg-white/90 text-[#123e74] px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Schedule a Call
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Carousel Section */}
      <section className="py-24 bg-gradient-to-br from-[#20B2AA] to-[#48D1CC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Our Key Solutions
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover how we can transform your sales process
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
                {[
                  {
                    title: "Sales Automation",
                    image: "https://images.unsplash.com/photo-1560264280-88b68371db39?w=800&auto=format&fit=crop&q=60",
                    description: "Streamline your sales process with cutting-edge automation tools that increase efficiency and reduce manual tasks."
                  },
                  {
                    title: "Team Development",
                    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60",
                    description: "Build and nurture high-performing sales teams through our comprehensive training and development programs."
                  },
                  {
                    title: "Lead Generation",
                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
                    description: "Generate quality leads consistently with our proven methodologies and advanced targeting strategies."
                  },
                  {
                    title: "Performance Analytics",
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
                    description: "Make data-driven decisions with our advanced analytics and reporting tools."
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    className="relative group perspective"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="relative w-full h-[400px] transform-gpu">
                      <div
                        className={`card relative w-full h-full ${hoveredCard === index ? 'flipped' : ''}`}
                        onClick={() => setHoveredCard(hoveredCard === index ? null : index)}
                      >
                        {/* Front of card */}
                        <div className="card-face absolute inset-0 rounded-2xl overflow-hidden shadow-xl">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {card.title}
                            </h3>
                          </div>
                          <button 
                            className="card-button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setHoveredCard(index);
                            }}
                            aria-label="Show more details"
                          >
                            <Plus className="w-6 h-6" />
                          </button>
                        </div>

                        {/* Back of card */}
                        <div className="card-face card-back absolute inset-0 rounded-2xl overflow-hidden shadow-xl">
                          <div className="w-full h-full bg-gradient-to-br from-[#20B2AA] to-[#48D1CC] p-6 flex flex-col justify-between">
                            <p className="text-lg text-white leading-relaxed">
                              {card.description}
                            </p>
                            <button 
                              className="card-button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setHoveredCard(null);
                              }}
                              aria-label="Show less details"
                            >
                              <Minus className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section 
        className="py-32 relative overflow-hidden"
        style={{ y: featuresY }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Growth Accelerators
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive solutions to transform your sales operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-8 rounded-2xl"
              >
                <motion.div 
                  className="text-[#123e74] mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="w-16 h-16" />
                </motion.div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-slate-600 text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Two-Step Process Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Our Two-Step Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A proven approach to building successful sales teams
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="mb-6">
                <span className="text-6xl font-bold text-[#123e74]">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Sales System Setup</h3>
              <p className="text-slate-600 mb-6">
                We optimize your existing sales infrastructure, working with your in-house team to set up essential tools and processes.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#123e74]" />
                  <span>CRM and tech stack implementation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#123e74]" />
                  <span>Integration of sales tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#123e74]" />
                  <span>Development of sales scripts</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#123e74]" />
                  <span>KPI tracking setup</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="mb-6">
                <span className="text-6xl font-bold text-[#123e74]">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Build Your SDR Team</h3>
              <p className="text-slate-600 mb-6">
                We help you scale by building a dedicated Sales Development Representative (SDR) team.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#123e74]" />
                  <span>SDR recruitment and onboarding</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#123e74]" />
                  <span>Fractional sales management</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#123e74]" />
                  <span>Ongoing training and support</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#123e74]" />
                  <span>Performance monitoring</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="py-32 bg-gradient-to-b from-white to-slate-50"
        style={{ y: statsY }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Proven Results
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our track record speaks for itself
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-12">
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.p 
                  className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#123e74] to-[#1a4e8f] bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {stat.number}
                </motion.p>
                <p className="text-lg text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
              Ready to Transform
              <br />
              Your Sales Process?
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Link href="/schedule-call">
                <Button
                  size="lg"
                  className="bg-[#0066CC] hover:bg-[#0077CC] text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Schedule a Call
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}