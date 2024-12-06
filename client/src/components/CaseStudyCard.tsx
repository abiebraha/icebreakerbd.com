import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Minus } from "lucide-react";
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
      <Card className="relative w-full h-[500px] bg-white shadow-lg group-hover:shadow-2xl transition-all duration-300">
        <div 
          className="w-full h-full preserve-3d transition-transform duration-1000 ease-in-out" 
          style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* Front of card */}
          <div 
            className="backface-hidden w-full h-full"
            onClick={() => setIsFlipped(true)}
          >
            <div className="w-full h-full bg-white rounded-2xl p-12 flex flex-col items-center justify-between">
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
          <div 
            className="backface-hidden w-full h-full"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="w-full h-full bg-[#123e74] rounded-2xl p-12 flex flex-col">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Minus className="w-5 h-5 text-white" />
              </button>
              
              <div className="space-y-6 text-white overflow-y-auto flex-1">
                <div>
                  <h3 className="text-3xl font-bold mb-3">{company}</h3>
                  <p className="text-xl font-medium text-white/90">{industry}</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-2">The Challenge</h4>
                  <p className="text-base text-white/80">{challenge}</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-2">Our Solution</h4>
                  <p className="text-base text-white/80">{solution}</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-3">Key Results</h4>
                  <ul className="space-y-3">
                    {results.map((result, i) => (
                      <li key={i} className="flex items-start gap-2 text-base text-white/80">
                        <div className="w-2 h-2 rounded-full bg-white mt-2" />
                        <span>{result}</span>
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
