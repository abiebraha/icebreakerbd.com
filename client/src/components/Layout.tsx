import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MouseEffect from "./MouseEffect";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MouseEffect />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
