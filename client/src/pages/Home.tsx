import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, LineChart, Target } from "lucide-react";

const images = [
  { src: '/images/IMG_1392.jpeg', title: 'Sales Excellence' },
  { src: '/images/IMG_1395.jpeg', title: 'Team Building' },
  { src: '/images/IMG_1400.jpeg', title: 'Process Optimization' },
  { src: '/images/IMG_1489.jpeg', title: 'Growth Strategy' },
  { src: '/images/IMG_1518.jpeg', title: 'Performance Analytics' },
  { src: '/images/IMG_1733.jpeg', title: 'Client Success' }
];

export default function Home() {
  const { scrollY } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState(images);
  
  // Enhanced spring animations for Apple-like smooth transitions
  const springConfig = { 
    stiffness: 50,
    damping: 20,
    mass: 1.5
  };

  const handleCardSwipe = (index: number, direction: number) => {
    // Calculate next index with wrap-around
    const nextIndex = (index + direction + images.length) % images.length;
    setCurrentIndex(nextIndex);

    // Wait for exit animation to complete before updating cards
    setTimeout(() => {
      const newCards = [...cards];
      const [removed] = newCards.splice(index, 1);
      if (direction > 0) {
        newCards.push(removed);
      } else {
        newCards.unshift(removed);
      }
      setCards(newCards);
    }, 200); // Match exit animation duration
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

      {/* Dynamic Photo Showcase */}
      <section className="py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Transforming Sales
              <br />
              <span className="bg-gradient-to-r from-[#123e74] to-[#2a9d8f] bg-clip-text text-transparent">
                Through Innovation
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how we help businesses achieve exceptional growth
            </p>
          </motion.div>

          <motion.div 
            className="overflow-hidden relative h-[448px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[320px]"
              style={{
                perspective: '2000px',
                transformStyle: 'preserve-3d',
              }}
            >
              <AnimatePresence initial={false}>
                {cards.map((image, index) => (
                  <motion.div
                    key={image.src}
                    className="absolute top-0 w-[320px] rounded-3xl group overflow-hidden shadow-2xl border border-white/10"
                    style={{ 
                      height: '448px',
                      zIndex: cards.length - index,
                      transformOrigin: 'center center',
                      cursor: 'grab',
                      position: 'absolute',
                      left: '50%',
                      top: '0',
                      transform: `translateX(-50%) rotate(${index * 2}deg) translateY(${index * 4}px)`,
                    }}
                    drag="x"
                    dragConstraints={{ left: -200, right: 200 }}
                    dragElastic={0.2}
                    onDragEnd={(event, info) => {
                      if (Math.abs(info.offset.x) > 100) {
                        handleCardSwipe(index, info.offset.x > 0 ? -1 : 1);
                      }
                    }}
                    initial={{ x: 0 }}
                    animate={{ 
                      x: 0,
                      rotate: index * 2,
                      translateY: index * 4 
                    }}
                    exit={{ 
                      x: 1000,
                      opacity: 0,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      rotate: 0,
                      zIndex: 10,
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      cursor: 'grabbing'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#123e74]/40 via-transparent to-[#2a9d8f]/30 opacity-0 
                      group-hover:opacity-100 transition-all duration-500 ease-out z-10" />
                    
                    <motion.div
                      className="relative w-full h-full transform-gpu group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#123e74]/40 via-transparent to-[#2a9d8f]/30 opacity-0 
                        group-hover:opacity-100 transition-all duration-500 ease-out z-10"
                      />
                      <img
                        src={image.src}
                        alt={image.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </motion.div>

                    <motion.div 
                      className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 via-black/40 to-transparent z-20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-white font-semibold text-2xl md:text-3xl transform group-hover:scale-105 transition-transform duration-300">
                        {image.title}
                      </h3>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
          
          <div className="mt-8 flex justify-center space-x-2">
            {cards.map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-[#123e74]' : 'bg-slate-300'}`}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: i === currentIndex ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
              />
            ))}
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
                description: "Build your dedicated SDR team within 3-6 months, perfectly sized for your growth phase before transitioning to an in-house team."
              },
              {
                icon: LineChart,
                title: "Complete Sales Stack",
                description: "Implement essential tools including CRM, autoDialer, lead data sources, and custom KPI tracking systems for seamless operations."
              },
              {
                icon: Target,
                title: "Proven Results",
                description: "Increase qualified leads and booked meetings with highly effective outbound systems and performance-based bonus structures."
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
              { number: "150%", label: "Increase in Pipeline Value" },
              { number: "200%", label: "More Qualified Meetings Booked" },
              { number: "5x", label: "Increase in Outbound Efforts" },
              { number: "60%", label: "Shorter Sales Cycles" }
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