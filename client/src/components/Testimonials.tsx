import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    role: "Sales Director in SaaS Industry",
    content: "The two-step approach helped us build a high-performing sales team from scratch. Our conversion rates have increased by 150% since implementation.",
    avatar: "/testimonials/saas.jpg",
    initials: "SD"
  },
  {
    role: "CEO in Technology Industry",
    content: "The sales system setup was exactly what we needed. It streamlined our processes and gave us the foundation to scale effectively.",
    avatar: "/testimonials/tech.jpg",
    initials: "CT"
  },
  {
    role: "Operations Manager in Software Industry",
    content: "The fractional sales management has been a game-changer. We got enterprise-level expertise without the enterprise-level cost.",
    avatar: "/testimonials/software.jpg",
    initials: "OS"
  }
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const floatingAnimation = {
    y: [-3, 3, -3],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  };

  return (
    <motion.section 
      ref={ref}
      className="bg-gradient-to-b from-slate-50 to-white py-24 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-6 text-slate-900"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>
        <motion.p
          className="text-xl text-slate-600 max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hear from businesses we've helped transform
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              animate={floatingAnimation}
            >
              <div className="group">
                <Card className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-2 rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#2c8d98]/20 hover:bg-gradient-to-b hover:from-white hover:to-slate-50/50">
                  <CardContent className="pt-8 pb-8 px-8 flex flex-col h-full relative">
                    <motion.div 
                      className="flex items-center gap-4 mb-6 relative z-10"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Avatar className="h-14 w-14 border-2 border-[#2c8d98]/20">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.role} />
                        <AvatarFallback className="bg-[#2c8d98]/10 text-[#2c8d98] font-semibold">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[#2c8d98] font-semibold text-lg">
                          {testimonial.role}
                        </p>
                      </div>
                    </motion.div>
                    <motion.p 
                      className="text-slate-600 text-lg leading-relaxed italic flex-grow relative z-10 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      "{testimonial.content}"
                    </motion.p>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
