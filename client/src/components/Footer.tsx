import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-2xl text-[#123e74]">SmartSales</h3>
            <p className="text-slate-600 text-sm">
              Transforming sales processes and building high-performing SDR teams through our proven two-step approach.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#123e74] transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#123e74] transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#123e74] transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Our Services" },
                { href: "/case-studies", label: "Case Studies" },
                { href: "/pricing", label: "Pricing" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-slate-600 hover:text-[#123e74] transition-colors">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Our Services</h4>
            <ul className="space-y-2">
              {[
                "Sales System Setup",
                "SDR Team Building",
                "Sales Training",
                "Process Optimization",
                "Performance Analytics",
              ].map((service) => (
                <li key={service}>
                  <Link href="/services">
                    <a className="text-slate-600 hover:text-[#123e74] transition-colors">
                      {service}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-600">
                <Mail size={16} />
                <a href="mailto:contact@smartsales.com" className="hover:text-[#123e74] transition-colors">
                  contact@smartsales.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <Phone size={16} />
                <a href="tel:+1234567890" className="hover:text-[#123e74] transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <MapPin size={16} className="mt-1" />
                <span>
                  123 Business Avenue<br />
                  Suite 100<br />
                  San Francisco, CA 94107
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-center text-slate-600 text-sm">
            © {currentYear} SmartSales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
