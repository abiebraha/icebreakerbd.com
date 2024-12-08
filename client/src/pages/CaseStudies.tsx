import { motion } from "framer-motion";
import CaseStudyCard from "@/components/CaseStudyCard";

const caseStudies = [
  {
    company: "Platinum Travel",
    industry: "Corporate Travel Management",
    challenge: "Small outbound sales team struggling to generate results and meet growth targets",
    solution: "Restructured and expanded sales team with proven methodologies",
    results: [
      "Successfully scaled to a high-performing team of 3 SDRs",
      "Implemented standardized outbound processes",
      "Increased qualified meeting generation",
      "Established consistent revenue growth"
    ],
    image: "/case-studies/platinum-travel.png"
  },
  {
    company: "Enso Brands",
    industry: "Amazon Store Management",
    challenge: "Exclusively reliant on SEO with no proactive outbound sales strategy",
    solution: "Built complete outbound sales motion from ground up",
    results: [
      "Developed first outbound sales program",
      "Increased qualified opportunities by 175%",
      "Achieved 150% revenue growth in 6 months",
      "Successfully diversified lead sources"
    ],
    image: "/case-studies/enso.png"
  },
  {
    company: "NBX Expo",
    industry: "Event Management",
    challenge: "Limited pipeline generation and inconsistent outbound processes causing missed revenue targets",
    solution: "Implemented structured sales system with clear processes and metrics tracking",
    results: [
      "Increased pipeline generation by 250%",
      "Created standardized sales playbook",
      "Achieved 150% growth in qualified meetings",
      "Improved pipeline velocity by 45%"
    ],
    image: "/case-studies/nbx.webp"
  },
  {
    company: "Leading Accounting Software Provider",
    industry: "Accounting Software",
    challenge: "No existing sales team or processes in place",
    solution: "Created comprehensive sales infrastructure and team from scratch",
    results: [
      "Built and trained first SDR team",
      "Implemented complete sales tech stack",
      "Achieved 250% growth in pipeline value",
      "Established predictable revenue model"
    ],
    image: "/case-studies/accounting-icon.svg"
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#123e74] to-[#2a9d8f]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 grid grid-cols-2 gap-x-4 gap-y-8">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="h-32 bg-white/20 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1],
                  transition: {
                    duration: 4,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Success Stories That
              <br />
              <span className="text-[#66b3ff] drop-shadow-lg">Drive Results</span>
            </h1>
            <p className="text-xl text-slate-100 max-w-3xl mx-auto">
              Discover how we've transformed sales operations into growth engines. 
              Real stories. Real impact. Real results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 max-w-3xl mx-auto gap-16 relative z-10">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#123e74]/5 via-[#2a9d8f]/5 to-[#e76f51]/5 rounded-xl -z-10 transform rotate-1" />
                <div className="absolute -inset-4 bg-gradient-to-l from-[#123e74]/5 via-[#2a9d8f]/5 to-[#e76f51]/5 rounded-xl -z-10 transform -rotate-1 opacity-70" />
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <CaseStudyCard {...study} />
                </motion.div>
                
                {/* Connecting Line */}
                {index < caseStudies.length - 1 && (
                  <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
                    <motion.div
                      className="w-px h-16 bg-gradient-to-b from-[#123e74]/20 via-[#2a9d8f]/20 to-transparent"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 64, opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}