import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const caseStudies = [
  {
    company: "NBX Expo",
    industry: "Event Management",
    challenge: "Inefficient and inconsistent outbound sales processes leading to missed opportunities",
    solution: "Implemented structured sales system with clear processes and metrics tracking",
    results: [
      "Established first dedicated outbound sales team",
      "Created standardized sales playbook",
      "300% increase in qualified meetings",
      "Reduced sales cycle by 45%"
    ],
    image: "/case-studies/nbx-expo.jpg",
    color: "from-blue-500/20"
  },
  {
    company: "Enso Brands",
    industry: "Consumer Products",
    challenge: "Exclusively reliant on SEO with no proactive outbound sales strategy",
    solution: "Built complete outbound sales motion from ground up",
    results: [
      "Developed first outbound sales program",
      "Generated 200+ new qualified opportunities",
      "Achieved 150% revenue growth in 6 months",
      "Successfully diversified lead sources"
    ],
    image: "/case-studies/enso-brands.jpg",
    color: "from-purple-500/20"
  },
  {
    company: "AccuFin Solutions",
    industry: "Accounting Software",
    challenge: "No existing sales team or processes in place",
    solution: "Created comprehensive sales infrastructure and team from scratch",
    results: [
      "Built and trained first SDR team",
      "Implemented complete sales tech stack",
      "Achieved 250% growth in pipeline value",
      "Established predictable revenue model"
    ],
    image: "/case-studies/accufin.jpg",
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
              <span className="text-[#0066CC]">Drive Results</span>
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
                              <ChevronRight className="w-4 h-4 text-[#0066CC]" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      
                    </div>
                  </div>
                  
                  <div className="order-1 md:order-2">
                    <div className="relative rounded-lg overflow-hidden bg-slate-100 aspect-[4/3]">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/20 to-transparent" />
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
