import { ReactNode, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-grow pt-16 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="h-full w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
