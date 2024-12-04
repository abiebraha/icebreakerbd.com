import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
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
    >
      <Card className="w-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden min-h-[600px] flex flex-col">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#123e74]/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <CardHeader className="flex-none">
          <motion.div 
            className="flex items-center gap-2 mb-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#123e74] text-white text-sm font-bold relative">
              {step}
              <motion.div
                className="absolute inset-0 rounded-full bg-white"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                style={{ opacity: 0.2 }}
              />
            </span>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              {title}
              <Sparkles className="w-5 h-5 text-[#123e74] opacity-75" />
            </CardTitle>
          </motion.div>
          <motion.div 
            className="mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-4xl font-bold text-[#123e74]">${price}</span>
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
        <CardContent className="flex-1 flex flex-col justify-between">
          <ul className="space-y-4 mb-6">
            {features.map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-center gap-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Check className="w-5 h-5 text-[#123e74]" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Button 
              className="w-full bg-[#123e74] hover:bg-[#1a4e8f] transition-all duration-300"
              size="lg"
            >
              {ctaText}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
