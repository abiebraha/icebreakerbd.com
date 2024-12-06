import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CaseStudyCardProps {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
}

export default function CaseStudyCard({
  company,
  industry,
  challenge,
  solution,
  results,
  image
}: CaseStudyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group cursor-pointer"
    >
      <Card className="w-full min-h-[500px] bg-white shadow-lg group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#123e74]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="relative h-[700px] preserve-3d transition-transform duration-1000 ease-in-out" 
          style={{ transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)" }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of card */}
          <div className="absolute inset-0 backface-hidden">
            <div className="h-full w-full bg-white rounded-2xl shadow-lg p-12 flex flex-col items-center justify-between group-hover:shadow-2xl transition-shadow">
              <div className="w-full text-center space-y-8">
                <div className="relative w-56 h-56 mx-auto">
                  <img
                    src={image}
                    alt={`${company} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">
                    {company}
                  </h3>
                  <p className="text-xl text-[#123e74] font-medium">
                    {industry}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-[#123e74] group-hover:text-[#1a4e8f] transition-colors text-lg">
                <span className="font-semibold">Read Case Study</span>
                <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute inset-0 backface-hidden" style={{ transform: "rotateX(180deg)" }}>
            <div className="h-full w-full bg-[#123e74] rounded-2xl shadow-lg p-12 flex flex-col relative group-hover:shadow-2xl transition-shadow text-white">
              <div className="space-y-8 overflow-y-auto">
                <div>
                  <h3 className="text-3xl font-bold mb-3">{company}</h3>
                  <p className="text-xl font-medium text-white/90">{industry}</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-3">The Challenge</h4>
                  <p className="text-lg text-white/80">{challenge}</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-3">Our Solution</h4>
                  <p className="text-lg text-white/80">{solution}</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4">Key Results</h4>
                  <ul className="space-y-4">
                    {results.map((result, i) => (
                      <li key={i} className="flex items-center gap-3 text-lg text-white/80">
                        <div className="w-2 h-2 rounded-full bg-white" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
