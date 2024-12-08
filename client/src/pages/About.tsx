import { motion } from "framer-motion";
import { Link } from "wouter";
import { Shield, Users, Trophy, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-gradient-to-br from-[#123e74] via-[#1a4e8f] to-[#2a6d8f]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transforming Sales Teams
              <br />
              <span className="text-cyan-300">One Step at a Time</span>
            </h1>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto">
              We're a team of sales experts passionate about helping businesses build and optimize their sales processes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-left mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-slate-200">The principles that guide our work</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <value.icon className="w-12 h-12 text-cyan-300 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-slate-200">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Profile Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-full md:w-1/3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative rounded-lg overflow-hidden aspect-square shadow-xl">
                <img 
                  src="/abe-profile.png" 
                  alt="Abe Braha" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <div className="w-full md:w-2/3 text-center md:text-left">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Abe Braha, Founder
              </motion.h2>
              <motion.p 
                className="text-xl text-slate-200 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Abe is a seasoned sales and business development professional with a track record in sales and business development. With over a decade of experience, his passion lies in quickly building successful and scalable sales departments.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link href="/schedule-call" className="inline-block">
                  <Button
                    size="lg"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
                  >
                    Book a Call With Abe
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
