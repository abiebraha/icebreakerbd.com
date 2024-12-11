import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, Mail, MessagesSquare, Plus, Minus, Calculator } from "lucide-react";

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
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-[#123e74] px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                onClick={() => window.location.href = '/schedule-call'}
              >
                Schedule a Call
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Carousel Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4AE8B0] to-[#25B086] bg-clip-text text-transparent mb-6 tracking-tight">
              Our Key Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover how we can transform your sales process
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 pb-8">
                {[
                  {
                    title: "Sales Automation",
                    image: "/images/IMG_1392_optimized.jpg",
                    description: "Transform your sales process with cutting-edge automation:\n\n• Intelligent Lead Scoring: AI-driven lead prioritization based on behavioral signals\n• Smart Sequences: Personalized email campaigns for maximum engagement\n• Advanced CRM Integration: Seamless sync with Salesforce, HubSpot & more\n• Workflow Builder: Custom automation reducing manual work\n• Real-time Dashboard: Live KPI tracking & performance metrics\n• Smart Calendar: AI-powered meeting scheduling across timezones\n• Revenue Forecasting: Predictive analytics for accurate planning\n• Task Automation: Auto-assignment & follow-up system\n\nProven Impact:\n✓ Significant increase in qualified meetings booked\n✓ Dramatically reduced response times\n✓ Enhanced pipeline velocity\n✓ Improved sales team productivity"
                  },
                  {
                    title: "Team Development",
                    image: "/images/IMG_1542_optimized.jpg",
                    description: "Scale your sales team with expert coaching:\n\n• Elite Training Program: Customized learning paths for each role\n• Real-time AI Coach: Live call analysis & instant feedback\n• Sales Playbook Creation: Best practices & winning strategies\n• Leadership Academy: Management & team scaling expertise\n• Performance Tracking: Individual & team metrics dashboard\n• Skills Workshop: Advanced negotiation & closing techniques\n• Knowledge Library: Searchable sales resources & templates\n• Behavioral Science: Psychology of B2B decision-making\n\nProven Impact:\n✓ Most reps exceeding quota within months\n✓ Accelerated ramp-up for new hires\n✓ Substantial improvement in close rates\n✓ Outstanding team retention"
                  },
                  {
                    title: "Lead Generation",
                    image: "/images/IMG_1593_optimized.jpg",
                    description: "Generate premium leads at enterprise scale:\n\n• Multi-channel Outreach: Integrated LinkedIn, Email & Phone\n• ABM Campaigns: Fortune 500 targeting & engagement\n• Social Selling: Advanced connection & content strategies\n• Prospect Intelligence: Deep insights & buying signals\n• Organization Mapping: Decision-maker identification\n• Engagement Tracking: Real-time response analytics\n• Custom Sequences: Industry-specific outreach paths\n• Buyer Profiling: Ideal customer profile development\n\nProven Impact:\n✓ Multiplied qualified opportunities\n✓ Reduced acquisition costs\n✓ Improved response rates\n✓ Enhanced lead quality"
                  },
                  {
                    title: "Performance Analytics",
                    image: "/images/IMG_1395_optimized.jpg",
                    description: "Optimize sales with data-driven insights:\n\n• Live Performance Hub: Real-time sales activity tracking\n• AI Forecasting: Highly accurate revenue prediction\n• Pipeline Optimization: Deal velocity & conversion analytics\n• Attribution Engine: Multi-touch revenue tracking\n• Efficiency Metrics: Activity & outcome correlation\n• ROI Analysis: Custom measurement frameworks\n• Team Benchmarking: Industry performance standards\n• Growth Modeling: Predictive scaling scenarios\n\nProven Impact:\n✓ Superior forecast accuracy\n✓ Increased win rates\n✓ Accelerated sales cycles\n✓ Larger average deal sizes"
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    className="card-container"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      delay: index * 0.2,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 50,
                      damping: 20
                    }}
                    style={{ perspective: "1000px" }}
                  >
                    <div className="relative w-full aspect-[3/4]">
                      <div
                        className={`card ${hoveredCard === index ? 'flipped' : ''}`}
                        onClick={() => setHoveredCard(hoveredCard === index ? null : index)}
                        style={{
                          transformStyle: 'preserve-3d',
                          transition: 'all 0.6s ease',
                          transform: hoveredCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          position: 'relative',
                          width: '100%',
                          height: '100%'
                        }}
                      >
                        {/* Front of card */}
                        <div 
                          className="card-face absolute w-full h-full rounded-lg"
                          style={{
                            backgroundImage: `url(${card.image}?quality=80&w=800)`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                          }}
                        >
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-2xl font-medium text-black">
                              {card.title}
                            </h3>
                          </div>
                          <button 
                            className="card-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setHoveredCard(index);
                            }}
                            aria-label="Show more details"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Back of card */}
                        <div 
                          className="card-face absolute w-full h-full rounded-lg"
                          style={{ 
                            background: 'linear-gradient(to bottom right, #4AE8B0, #25B086)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            color: 'white'
                          }}
                        >
                          <div className="h-full p-6 overflow-y-auto hide-scrollbar">
                            <div className="space-y-4">
                              <h3 className="text-2xl font-bold !text-white mb-2">
                                {card.title}
                              </h3>
                              <div className="w-12 h-1 !bg-white/30 mb-6"></div>
                              <h4 className="text-xl font-bold !text-white mb-4">
                                Key Features
                              </h4>
                              <div className="space-y-2">
                                {card.description.split('\n\n')[0].split('\n').slice(1).map((feature, i) => (
                                  <p 
                                    key={i}
                                    className="!text-white text-sm py-1"
                                    style={{ color: 'white !important' }}
                                  >
                                    {feature}
                                  </p>
                                ))}
                              </div>
                              
                              <h4 className="text-xl font-bold text-white mb-4 mt-6">
                                Results
                              </h4>
                              <div className="space-y-2">
                                {card.description.split('\n\n')[2].split('\n').map((result, i) => (
                                  <p 
                                    key={i}
                                    className="text-white/90 text-sm py-1"
                                  >
                                    {result}
                                  </p>
                                ))}
                              </div>
                            </div>
                            <button 
                              className="card-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setHoveredCard(null);
                              }}
                              aria-label="Show less details"
                            >
                              <Minus className="w-5 h-5" />
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

      {/* Free Tools Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-gradient-to-r from-[#0A66C2] via-[#00A3E1] via-[#FF4D4D] to-[#FF4D4D] bg-clip-text text-transparent">
              Free Sales Tools
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Boost your sales productivity with our suite of free tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/tools/linkedin-post" className="block h-full">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-[#0A66C2] rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">LinkedIn Post Generator</h3>
                <p className="text-slate-600 text-sm flex-grow">Create engaging LinkedIn posts that drive engagement and connections</p>
              </motion.div>
            </Link>

            <Link href="/tools/cold-email" className="block h-full">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-[#00A3E1] rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cold Email Generator</h3>
                <p className="text-slate-600 text-sm flex-grow">Generate personalized cold emails that get responses</p>
              </motion.div>
            </Link>

            <Link href="/tools/sales-script" className="block h-full">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-[#FF4D4D] rounded-lg flex items-center justify-center mb-4">
                  <MessagesSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sales Script Generator</h3>
                <p className="text-slate-600 text-sm flex-grow">Create effective sales scripts for your outreach calls</p>
              </motion.div>
            </Link>

            <Link href="/roi-calculator" className="block h-full">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-[#0066CC] rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">ROI Calculator</h3>
                <p className="text-slate-600 text-sm flex-grow">Calculate the potential return on investment from your SDR team</p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section 
        className="py-24 relative overflow-hidden"
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-[#FF2D55] to-[#FF00FF] bg-clip-text text-transparent">
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
                icon: MessagesSquare,
                title: "Process Optimization",
                description: "Streamline your sales operations with proven methodologies."
              },
              {
                icon: Calculator,
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
                  className="mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="w-16 h-16 text-transparent bg-gradient-to-r from-[#FF2D55] to-[#FF00FF] bg-clip-text" />
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-[#34D399] to-[#059669] bg-clip-text text-transparent">
              Our Two-Step Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A proven approach to building successful sales teams
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 relative">
            {/* Arrow between cards */}
            <motion.div 
              className="hidden md:flex absolute left-[42%] top-1/2 -translate-y-1/2 z-10"
              initial={{ opacity: 0, x: -30 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 20H150M150 20L130 5M150 20L130 35"
                  stroke="url(#arrow-gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="arrow-gradient" x1="0" y1="12" x2="120" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34D399" />
                    <stop offset="1" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="mb-6">
                <span className="text-6xl font-bold bg-gradient-to-r from-[#34D399] to-[#059669] bg-clip-text text-transparent">1</span>
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
                <span className="text-6xl font-bold bg-gradient-to-r from-[#34D399] to-[#059669] bg-clip-text text-transparent">2</span>
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
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
                  className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent"
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
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              <span className="text-slate-900">Ready to Transform</span>
              <br />
              <span className="bg-gradient-to-r from-[#0066CC] to-[#0077CC] bg-clip-text text-transparent">Your Sales Process?</span>
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
