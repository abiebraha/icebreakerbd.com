import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function CalendlyEmbed() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL;

  useEffect(() => {
    if (!calendlyUrl) {
      console.error('Calendly URL is not defined in environment variables');
      setError('Calendly configuration is missing. Please try again later.');
      setIsLoading(false);
      return;
    }

    // Check if Calendly script is loaded
    const checkScriptLoaded = () => {
      if (!(window as any).Calendly) {
        setError('Failed to load Calendly widget. Please refresh the page.');
        setIsLoading(false);
        return false;
      }
      return true;
    };

    // Initialize Calendly widget
    const initializeCalendly = () => {
      try {
        if (checkScriptLoaded()) {
          (window as any).Calendly.initInlineWidget({
            url: calendlyUrl,
            parentElement: document.querySelector('.calendly-inline-widget'),
          });
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error initializing Calendly:', err);
        setError('Failed to initialize Calendly widget. Please try again later.');
        setIsLoading(false);
      }
    };

    // Check if script is already loaded
    if ((window as any).Calendly) {
      initializeCalendly();
    } else {
      // Script onload handler
      const handleScriptLoad = () => {
        initializeCalendly();
      };

      // Script error handler
      const handleScriptError = () => {
        setError('Failed to load Calendly widget. Please check your connection and try again.');
        setIsLoading(false);
      };

      // Add script load and error handlers
      const script = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
      if (script) {
        script.addEventListener('load', handleScriptLoad);
        script.addEventListener('error', handleScriptError);

        return () => {
          script.removeEventListener('load', handleScriptLoad);
          script.removeEventListener('error', handleScriptError);
        };
      }
    }
  }, [calendlyUrl]);

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-md text-center">
        <p className="text-red-600 mb-2">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-sm text-red-600 hover:text-red-700 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-md">
        <Loader2 className="h-8 w-8 animate-spin text-[#123e74] mb-4" />
        <p className="text-slate-600">Loading calendar...</p>
      </div>
    );
  }

  return (
    <div 
      className="calendly-inline-widget" 
      style={{
        minWidth: '320px',
        height: '700px',
      }}
    />
  );
}
