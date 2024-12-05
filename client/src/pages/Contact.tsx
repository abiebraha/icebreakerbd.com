import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#123e74]/5 via-transparent to-transparent"
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
              Let's Start Your
              <br />
              <span className="text-[#0066CC]">Sales Growth Journey</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Ready to transform your sales process? Get in touch with our team today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-[#0066CC] mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                      <p className="text-slate-600">info@icebreakerbd.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-[#0066CC] mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                      <p className="text-slate-600">917-809-6610</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[#0066CC] mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Office</h3>
                      <p className="text-slate-600">
                        Brooklyn, NY
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Office Hours
                </h2>
                <div className="space-y-2 text-slate-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
