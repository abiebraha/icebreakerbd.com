import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface PricingCardProps {
  step: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  perSdr?: boolean;
}

export default function PricingCard({
  step,
  title,
  price,
  description,
  features,
  ctaText,
  perSdr = false,
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group cursor-pointer"
    >
      <Card className="w-full min-h-[500px] shadow-lg group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col border-0"
        style={{ background: "linear-gradient(to right, #2c8d98, #0066CC)" }}
        >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#40a0aa]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <CardHeader className="flex-grow">
          <motion.div 
            className="flex items-center gap-2 mb-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#2c8d98] to-[#0066CC] text-white text-sm font-bold relative">
              {step}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2c8d98] to-[#0066CC]"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                style={{ opacity: 0.2 }}
              />
            </span>
            <CardTitle className="text-2xl text-black font-bold flex items-center gap-2">
              {title}
            </CardTitle>
          </motion.div>
          <motion.div 
            className="mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-4xl font-bold gradient-from-[#2c8d98] to-[#0066CC]">${price}</span>
            <span className="text-slate-600 ml-1">/month{perSdr ? " per SDR" : ""}</span>
          </motion.div>
          <motion.p 
            className="text-slate-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {description}
          </motion.p>
        </CardHeader>
        <CardContent className="flex-grow-0">
          <ul className="space-y-4 mb-6">
            {features.map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-center gap-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Check className="w-5 h-5 text-[bg-gradient-to-r from-[#2c8d98] to-[#0066CC]]" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
          <motion.div 
            className="flex items-center justify-center gap-2 text-[#40a0aa] group-hover:text-[bg-gradient-to-r from-[#2c8d98] to-[#0066CC]] transition-colors duration-300"
            whileHover={{ x: 5 }}
          >
            <span className="font-semibold relative text-black">
              {ctaText}
              <motion.div 
                className="absolute bottom-0 left-0 w-0 h-0.5 text-black group-hover:w-full transition-all duration-300"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
              />
            </span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 text-black"
              />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
