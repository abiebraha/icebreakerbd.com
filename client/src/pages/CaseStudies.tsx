import { motion } from "framer-motion";
import CaseStudyCard from "@/components/CaseStudyCard";

const caseStudies = [
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <CaseStudyCard {...study} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}