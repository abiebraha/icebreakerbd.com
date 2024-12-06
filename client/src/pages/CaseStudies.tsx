import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

const caseStudies = [
  {
    company: "TechStart Solutions",
    industry: "SaaS",
    challenge: "Struggling to scale sales team and processes efficiently",
    solution: "Implemented our two-step approach with sales system optimization and SDR team building",
    results: [
      "150% increase in qualified leads",
      "45% improvement in conversion rates",
      "Scaled SDR team from 2 to 8 members",
      "ROI achieved within 4 months"
    ],
    image: "/case-studies/tech-start.jpg",
    color: "from-blue-500/20"
  },
  {
    company: "Global Innovations Corp",
    industry: "Technology Services",
    challenge: "Inefficient sales processes and low team productivity",
    solution: "Complete sales system overhaul and implementation of performance analytics",
    results: [
      "200% increase in sales productivity",
      "60% reduction in sales cycle length",
      "35% improvement in close rates",
      "Standardized sales processes across teams"
    ],
    image: "/case-studies/global-innovations.jpg",
    color: "from-purple-500/20"
  },
  {
    company: "DataFlow Analytics",
    industry: "Data Analytics",
    challenge: "Difficulty in maintaining consistent sales growth",
    solution: "Implementation of fractional sales management and SDR team development",
    results: [
      "85% growth in monthly recurring revenue",
      "40% increase in average deal size",
      "Built high-performing SDR team of 5",
      "Established predictable sales pipeline"
    ],
    image: "/case-studies/data-flow.jpg",
    color: "from-green-500/20"
  }
];

export default function CaseStudiesPage() {
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
              Success Stories That
              <br />
              <span className="text-[#123e74]">Drive Results</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover how we've helped companies transform their sales operations and achieve remarkable growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          {study.company}
                        </h3>
                        <p className="text-[#123e74] font-medium">
                          Industry: {study.industry}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">The Challenge</h4>
                        <p className="text-slate-600">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Our Solution</h4>
                        <p className="text-slate-600">{study.solution}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Key Results</h4>
                        <ul className="space-y-3">
                          {study.results.map((result, i) => (
                            <li key={i} className="flex items-center gap-2 text-slate-600">
                              <ChevronRight className="w-4 h-4 text-[#123e74]" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <motion.div 
                        className="inline-flex items-center gap-2 text-[#123e74] font-medium cursor-pointer group"
                        whileHover={{ x: 5 }}
                      >
                        Read Full Case Study
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="order-1 md:order-2">
                    <div className="relative rounded-lg overflow-hidden bg-slate-100 aspect-[4/3]">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#123e74]/20 to-transparent" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
