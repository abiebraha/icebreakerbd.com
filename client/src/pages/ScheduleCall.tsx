import { useEffect } from "react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    Calendly: any;
  }
}

export default function ScheduleCallPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/5 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Schedule a Call
              <br />
              <span className="text-[#0066CC]">With Our Team</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Book a consultation to discuss how we can help accelerate your sales growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendly inline widget */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/icebreakerbd/meeting-with-abie-braha?hide_gdpr_banner=1"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </section>
    </div>
  );
}
