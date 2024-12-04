import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
