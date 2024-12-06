import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

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
    <div className="relative h-[500px] w-full perspective-1000">
      <AnimatePresence mode="wait" initial={false}>
        {!isFlipped ? (
          <motion.div
            key="front"
            className="absolute inset-0 backface-hidden"
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -180 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-full w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-between hover:shadow-xl transition-shadow">
              <div className="w-full text-center space-y-6">
                <div className="relative w-48 h-48 mx-auto">
                  <img
                    src={image}
                    alt={`${company} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {company}
                  </h3>
                  <p className="text-[#123e74] font-medium">
                    {industry}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setIsFlipped(true)}
                className="group flex items-center gap-2 text-[#123e74] hover:text-[#1a4e8f] transition-colors"
              >
                <span className="font-semibold">Read Case Study</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            className="absolute inset-0 backface-hidden"
            initial={{ rotateY: -180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-full w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col relative hover:shadow-xl transition-shadow">
              <button
                onClick={() => setIsFlipped(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{company}</h3>
                  <p className="text-[#123e74] font-medium">{industry}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">The Challenge</h4>
                  <p className="text-slate-600">{challenge}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Our Solution</h4>
                  <p className="text-slate-600">{solution}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-4">Key Results</h4>
                  <ul className="space-y-3">
                    {results.map((result, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#123e74]" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
