import { motion } from "framer-motion";
import { ColdCallGenerator } from "@/components/generators/ColdCallGenerator";

export default function ColdCallPage() {
  return (
    <div className="bg-white">
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
              Cold Call Script
              <br />
              <span className="text-[#0066CC]">Generator</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Create effective cold calling scripts that convert prospects into opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ColdCallGenerator />
        </div>
      </section>
    </div>
  );
}
