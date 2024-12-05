import { ReactNode, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { LoadingSpinner } from "./ui/loading-spinner";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
