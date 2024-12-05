import { motion } from "framer-motion";
import { Shield, Users, Trophy, Brain } from "lucide-react";



const values = [
  {
    icon: Shield,
    title: "Trust & Integrity",
    description: "We build lasting relationships through transparency and honest communication."
  },
  {
    icon: Users,
    title: "Collaborative Growth",
    description: "Success is achieved through strong partnerships with our clients."
  },
  {
    icon: Trophy,
    title: "Results-Driven",
    description: "We measure our success through the concrete results we deliver."
  },
  {
    icon: Brain,
    title: "Continuous Innovation",
    description: "Constantly improving and adapting to industry changes."
  }
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#123e74]/5 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0" style={{ perspective: "2000px" }}>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`grid-${i}`}
                className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#123e74]/15 to-transparent"
                style={{
                  top: `${(i + 1) * 6.66}%`,
                  transform: "rotateX(75deg)",
                }}
                animate={{
                  scaleX: [0.9, 1.1, 0.9],
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Transforming Sales Teams
              <br />
              <span className="text-[#123e74]">One Step at a Time</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're a team of sales experts passionate about helping businesses build and optimize their sales processes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Values</h2>
            <p className="text-lg text-slate-600">The principles that guide our work and relationships</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-4 inline-block p-4 bg-white rounded-full shadow-md">
                  <value.icon className="w-8 h-8 text-[#123e74]" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}
