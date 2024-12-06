import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  Laptop, 
  Target,
  Briefcase,
  LineChart,
  HeartHandshake,
  Rocket
} from "lucide-react";
import AnimatedGrid from "@/components/AnimatedGrid";

const services = [
  {
    icon: Laptop,
    title: "Sales System Setup",
    description: "Complete implementation and optimization of your sales infrastructure, including CRM setup and tool integration.",
    features: [
      "CRM and tech stack implementation",
      "Sales tools integration",
      "Data provider setup",
      "Process automation"
    ]
  },
  {
    icon: Users,
    title: "SDR Team Building",
    description: "Build and scale your Sales Development Representative team with expert recruitment and training.",
    features: [
      "Talent acquisition",
      "Onboarding program",
      "Performance metrics setup",
      "Team structure optimization"
    ]
  },
  {
    icon: BarChart3,
    title: "Sales Training",
    description: "Comprehensive training programs designed to elevate your sales team's performance.",
    features: [
      "Sales methodology training",
      "Product knowledge sessions",
      "Objection handling",
      "Cold calling techniques"
    ]
  },
  {
    icon: Target,
    title: "Process Optimization",
    description: "Streamline your sales processes for maximum efficiency and conversion rates.",
    features: [
      "Workflow analysis",
      "Bottleneck identification",
      "Process redesign",
      "Implementation support"
    ]
  },
  {
    icon: LineChart,
    title: "Performance Analytics",
    description: "Data-driven insights to measure and improve sales performance.",
    features: [
      "KPI dashboard setup",
      "Performance tracking",
      "ROI analysis",
      "Regular reporting"
    ]
  },
  {
    icon: HeartHandshake,
    title: "Fractional Sales Management",
    description: "Expert sales leadership without the full-time executive cost.",
    features: [
      "Strategy development",
      "Team leadership",
      "Performance management",
      "Growth planning"
    ]
  },
  {
    icon: Briefcase,
    title: "Sales Tools Consultation",
    description: "Expert guidance on selecting and implementing the right sales tools.",
    features: [
      "Tech stack assessment",
      "Tool recommendation",
      "Integration planning",
      "Vendor management"
    ]
  },
  {
    icon: Rocket,
    title: "Growth Strategy",
    description: "Comprehensive planning for sustainable sales growth.",
    features: [
      "Market analysis",
      "Growth roadmap",
      "Resource planning",
      "Scaling strategy"
    ]
  }
];

export default function ServicesPage() {
  const { scrollY } = useScroll();
  
  // Spring configuration for smooth animations
  const springConfig = { 
    stiffness: 50,
    damping: 20,
    mass: 1.5
  };
  
  // Hero section animations
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

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 overflow-hidden"
        style={{ 
          y: heroY,
          scale: heroScale,
          opacity: heroOpacity
        }}
      >
        <AnimatedGrid opacity={0.15} color="#0066CC" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Comprehensive Sales
              <br />
              <span className="text-[#0066CC]">Growth Solutions</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From system setup to team building, we provide end-to-end services to accelerate your sales growth.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <motion.div 
                  className="mb-6 text-[#123e74] transition-transform duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <service.icon className="w-12 h-12" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-[#123e74] transition-colors">
                  {service.title}
                </h3>
                <p className="text-lg text-slate-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="text-base text-slate-600 flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + (i * 0.1) }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#123e74]" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
