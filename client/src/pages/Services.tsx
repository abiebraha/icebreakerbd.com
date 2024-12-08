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
    description: "Complete implementation of your sales infrastructure within 3-6 months, including CRM setup and essential tool integration.",
    features: [
      "CRM and autoDialer implementation",
      "Lead data sources integration",
      "Custom KPI tracking system setup",
      "Performance-based bonus structure"
    ]
  },
  {
    icon: Users,
    title: "SDR Team Building",
    description: "Build and transition to your own SDR team within 3-6 months, with expert recruitment, training, and proven performance frameworks.",
    features: [
      "Dedicated SDR recruitment process",
      "Comprehensive onboarding & training",
      "Performance-based bonus structure",
      "Transition to in-house management"
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
    description: "Implement proven systems that have helped clients achieve 150% increase in pipeline value and 60% shorter sales cycles.",
    features: [
      "Sales workflow automation",
      "CRM & autoDialer optimization",
      "Lead scoring implementation",
      "Sales cycle acceleration"
    ]
  },
  {
    icon: LineChart,
    title: "Performance Analytics",
    description: "Track and improve key metrics with our proven system that has achieved 200% more meetings booked and 5x increase in outbound efforts.",
    features: [
      "Custom KPI tracking dashboard",
      "Pipeline value monitoring",
      "Meeting conversion analytics",
      "Outbound activity metrics"
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
          className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/5 via-transparent to-transparent"
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
              <span className="text-[#0066CC]">Growth Solutions</span>
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
                  <service.icon className="w-12 h-12 text-[#123e74]" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#123e74]" />
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
