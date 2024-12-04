import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  {
    question: "Can I start with Step 2 if I already have a sales system in place?",
    answer: "Yes, if you already have an established sales system, you can directly start with Step 2. However, we recommend a brief assessment of your current setup to ensure optimal integration with our SDR team building process."
  },
  {
    question: "Is there a minimum contract length?",
    answer: "We typically recommend a minimum 3-month commitment to see meaningful results, but we can discuss flexible arrangements based on your specific needs."
  },
  {
    question: "What does fractional sales management include?",
    answer: "Fractional sales management includes dedicated oversight of your SDR team, regular performance reviews, strategy optimization, and ongoing mentorship - all without the cost of a full-time sales manager."
  },
  {
    question: "How quickly can you help us scale our SDR team?",
    answer: "Once your sales system is in place, we can typically recruit and onboard new SDRs within 2-4 weeks. The exact timeline depends on your specific requirements and market conditions."
  }
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          variants={itemVariants}
        >
          Frequently Asked Questions
        </motion.h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-[#123e74] transition-colors duration-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
}
