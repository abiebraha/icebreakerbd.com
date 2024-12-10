import { motion } from "framer-motion";
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
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#D97B66]/10 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
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
              <span className="text-[#D97B66]">Growth Solutions</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From system setup to team building, we provide end-to-end services to accelerate your sales growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  <service.icon className="w-12 h-12 text-[#D97B66]" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-[#D97B66] to-[#FF8C42] bg-clip-text text-transparent mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
