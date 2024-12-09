import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

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
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Hear from businesses we've helped transform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group cursor-pointer"
            >
              <Card 
                className={`w-full min-h-[300px] shadow-lg group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col`}
                style={{ 
                  background: index === 1 
                    ? "linear-gradient(to bottom, #e8f6f7, #f4f9fa, #e0f3f4)"
                    : "linear-gradient(to bottom right, #f8fafc, #ffffff)"
                }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br from-[#40a0aa]/5 via-transparent to-transparent ${
                    index === 1 ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                  } transition-opacity duration-500`}
                />
                <CardContent className="flex-grow p-6">
                  <motion.div 
                    className="flex items-center gap-2 mb-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Avatar className="h-12 w-12 border-2 border-[#40a0aa]/20">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.role} />
                      <AvatarFallback className="bg-[#40a0aa]/10 text-[#40a0aa] font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-xl font-bold text-slate-900">
                      {testimonial.role}
                    </div>
                  </motion.div>
                  <motion.p 
                    className="text-slate-600 text-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    "{testimonial.content}"
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
