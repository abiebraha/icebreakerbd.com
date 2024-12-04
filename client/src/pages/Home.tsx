import { Button } from "@/components/ui/button";
import PricingCard from "../components/PricingCard";
import FAQSection from "../components/FAQSection";
import ContactForm from "../components/ContactForm";
import Testimonials from "../components/Testimonials";
import { ArrowDown } from "lucide-react";

export default function Home() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Accelerate Your Sales Growth in Two Steps
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Transform your sales process and build a high-performing SDR team with our proven two-step approach.
          </p>
          <Button
            size="lg"
            onClick={() => scrollToSection('pricing')}
            className="gap-2"
          >
            View Pricing <ArrowDown size={16} />
          </Button>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Pricing Model</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <PricingCard
              step="1"
              title="Sales System Setup"
              price="2,000"
              description="We optimize your existing sales infrastructure, working with your in-house team to set up essential tools and processes."
              features={[
                "CRM and tech stack implementation",
                "Integration of sales tools and data providers",
                "Development of sales scripts and email templates",
                "KPI tracking setup"
              ]}
              ctaText="Start with Step 1"
            />
            <PricingCard
              step="2"
              title="Build Your SDR Team"
              price="3,000"
              description="We help you scale by building a dedicated Sales Development Representative (SDR) team."
              features={[
                "SDR recruitment and onboarding",
                "Fractional sales management",
                "Ongoing training and support",
                "Performance monitoring"
              ]}
              ctaText="Expand with Step 2"
              perSdr={true}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <section id="contact" className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Get Started Today</h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
