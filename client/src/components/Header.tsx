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
  {
    label: "Tools",
    items: [
      { href: "/tools/cold-email", label: "Cold Email Generator" },
      { href: "/tools/sales-script", label: "Sales Script Generator" },
      { href: "/tools/linkedin-post", label: "LinkedIn Post Generator" },
      { href: "/roi-calculator", label: "ROI Calculator" },
    ],
  },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/schedule-call", label: "Schedule Call" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
const [expandedSection, setExpandedSection] = useState<string | null>(null);

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
        isScrolled 
          ? "bg-gradient-to-br from-[#123e74]/75 via-[#2a6d8f]/75 to-[#2a9d8f]/75 backdrop-blur-md border-b border-white/5" 
          : "bg-transparent"
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
              <NavigationMenuList className="group flex flex-1 list-none items-center justify-center space-x-1 [&>*]:bg-transparent">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 bg-transparent">
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid gap-1.5 p-3 min-w-[220px] bg-gradient-to-br from-[#123e74] via-[#2a6d8f] to-[#2a9d8f] rounded-lg shadow-lg border border-white/10"
                          >
                            {item.items?.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="block select-none rounded-md px-4 py-2.5 text-sm font-medium text-white/90 no-underline outline-none transition-all duration-200 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link 
                        href={item.href}
                        className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                          location === item.href
                            ? "text-white font-semibold"
                            : "text-slate-200 hover:text-white"
                        }`}
                      >
                        {item.label}
                        {location === item.href && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-300"
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
              className="md:hidden fixed inset-x-0 top-16 bg-gradient-to-br from-[#123e74]/95 via-[#2a6d8f]/95 to-[#2a9d8f]/95 backdrop-blur-sm shadow-lg border-b border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  item.items ? (
                    <div key={item.label} className="space-y-1">
                      <button
                        className="w-full px-3 py-2 text-base font-medium text-white/90 hover:text-white flex items-center justify-between"
                        onClick={() => setExpandedSection(expandedSection === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform ${
                            expandedSection === item.label ? "rotate-180" : ""
                          }`} 
                        />
                      </button>
                      <AnimatePresence>
                        {expandedSection === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 space-y-1 py-1">
                              {item.items.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="block px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setExpandedSection(null);
                                  }}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        location === item.href
                          ? "text-white bg-white/20"
                          : "text-white/80 hover:text-white hover:bg-white/10"
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
