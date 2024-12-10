import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plus, Minus } from "lucide-react";
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
      className="group cursor-pointer case-study-container"
    >
      <Card className="relative w-full h-[500px] bg-white">
        <div 
          className="card"
          style={{ 
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front of card */}
          <div 
            className={`card-face card-front ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(true)}
          >
            <div className={`w-full h-full rounded-2xl p-12 flex flex-col items-center justify-center ${
              company === "Platinum Travel" ? "bg-[#b7791f]" : // Changed to gold
              company === "Enso Brands" ? "bg-[#0f766e]" :
              company === "NBX Expo" ? "bg-[#9f1239]" :
              "bg-[#334155]" // Default for Accounting Software
            }`}>
              <div className="w-full text-center">
                <div className="relative w-full h-48 mx-auto mb-8 flex items-center justify-center">
                  <div className="w-3/4 h-3/4">
                    <img
                      src={image}
                      alt={`${company} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white">
                  {company}
                </h3>
                <div className="mt-8 flex items-center justify-center gap-2 text-white/90 group-hover:text-white transition-colors text-lg">
                  <span className="font-semibold">View Case Study</span>
                  <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <button 
                className="card-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
                aria-label="Show more details"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Back of card */}
          <div 
            className={`card-face card-back ${isFlipped ? 'flipped' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
          >
            <div className="w-full h-full bg-[#123e74] rounded-2xl p-8 flex flex-col">
              <button 
                className="card-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
              >
                <Minus className="w-5 h-5 text-white" />
              </button>
              
              <div className="space-y-6 text-white overflow-y-auto flex-1">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{company}</h3>
                  <p className="text-lg font-medium text-white/90">{industry}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">The Challenge</h4>
                  <p className="text-sm text-white/90">{challenge}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Our Solution</h4>
                  <p className="text-sm text-white/90">{solution}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Key Results</h4>
                  <ul className="space-y-2">
                    {results.map((result, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5" />
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
