import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/roi-calculator", label: "ROI Calculator" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isTransparent 
          ? "bg-[#1a4e8f]" 
          : "bg-white shadow-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90">
            <img 
              src={isTransparent ? "/White logo - no background.png" : "/Color logo - no background.png"} 
              alt="ICEBREAKER" 
              className="h-8 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`relative py-2 text-sm font-medium ${
                  isTransparent
                    ? "text-white hover:text-white/90"
                    : location === item.href
                    ? "text-[#1a4e8f]"
                    : "text-slate-600 hover:text-[#1a4e8f]"
                }`}
              >
                {item.label}
                {location === item.href && !isTransparent && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a4e8f]" />
                )}
              </Link>
            ))}
            <Button 
              className={`ml-4 ${
                isTransparent
                  ? "bg-white text-[#1a4e8f] hover:bg-white/90"
                  : "bg-[#1a4e8f] text-white hover:bg-[#1a4e8f]/90"
              }`}
              onClick={() => window.location.href = 'https://app.icebreakerbd.com'}
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${
              isTransparent
                ? "text-white hover:text-white/90"
                : "text-slate-600 hover:text-[#1a4e8f]"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className={`md:hidden fixed inset-x-0 top-16 shadow-lg ${
              isTransparent ? "bg-[#1a4e8f]" : "bg-white"
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isTransparent
                      ? location === item.href
                        ? "text-white bg-white/10"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                      : location === item.href
                      ? "text-[#1a4e8f] bg-slate-50"
                      : "text-slate-600 hover:text-[#1a4e8f] hover:bg-slate-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button 
                className={`w-full mt-4 ${
                  isTransparent
                    ? "bg-white text-[#1a4e8f] hover:bg-white/90"
                    : "bg-[#1a4e8f] text-white hover:bg-[#1a4e8f]/90"
                }`}
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = 'https://app.icebreakerbd.com';
                }}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
