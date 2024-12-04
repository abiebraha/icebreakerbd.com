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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.section 
      ref={ref}
      className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              animate={floatingAnimation}
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <motion.div 
                    className="flex items-center gap-4 mb-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.role} />
                      <AvatarFallback>
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-slate-600 font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </motion.div>
                  <motion.p 
                    className="text-slate-600 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.3 }}
                  >
                    "{testimonial.content}"
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
