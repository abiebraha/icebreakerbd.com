import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
  {
    label: "Tools",
    items: [
      { href: "/tools/cold-email", label: "Cold Email Generator" },
      { href: "/tools/sales-script", label: "Sales Script Generator" },
      { href: "/tools/linkedin-post", label: "LinkedIn Post Generator" },
    ],
  },
  { href: "/roi-calculator", label: "ROI Calculator" },
  { href: "/schedule-call", label: "Schedule Call" },
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

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <img src="/logo.png" alt="ICEBREAKER" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid gap-3 p-4 w-[200px]">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{subItem.label}</div>
                              </Link>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link 
                        href={item.href}
                        className={`relative py-2 text-sm font-medium transition-colors ${
                          location === item.href
                            ? "text-[#123e74]"
                            : "text-slate-600 hover:text-[#123e74]"
                        }`}
                      >
                        {item.label}
                        {location === item.href && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#123e74]"
                            layoutId="underline"
                          />
                        )}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Button 
              className="ml-4 bg-[#123e74] hover:bg-[#1a4e8f]"
              onClick={() => window.location.href = 'https://app.icebreakerbd.com'}
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-[#123e74] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden fixed inset-x-0 top-16 bg-white shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  item.items ? (
                    <div key={item.label} className="space-y-1">
                      <div className="px-3 py-2 text-base font-medium text-slate-600">
                        {item.label}
                        <ChevronDown className="inline-block ml-1 h-4 w-4" />
                      </div>
                      <div className="pl-4 space-y-1">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-[#123e74] hover:bg-slate-50"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        location === item.href
                          ? "text-[#123e74] bg-slate-50"
                          : "text-slate-600 hover:text-[#123e74] hover:bg-slate-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
                <Button 
                  className="w-full mt-4 bg-[#123e74] hover:bg-[#1a4e8f]"
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = 'https://app.icebreakerbd.com';
                  }}
                >
                  Login
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
