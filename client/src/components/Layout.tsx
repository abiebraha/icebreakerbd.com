import { ReactNode, Suspense, useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { LoadingSpinner } from "./ui/loading-spinner";
import { LoadingScreen } from "./ui/loading-screen";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Remove initial loading screen after a short delay
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoad) {
    return <LoadingScreen />;
  }

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
