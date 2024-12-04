import { useEffect, useState } from 'react';

export default function CalendlyEmbed() {
  const [error, setError] = useState<string | null>(null);
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL;

  useEffect(() => {
    if (!calendlyUrl) {
      console.error('Calendly URL is not defined in environment variables');
      setError('Calendly configuration is missing');
    }
  }, [calendlyUrl]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div 
      className="calendly-inline-widget" 
      data-url={calendlyUrl}
      style={{
        minWidth: '320px',
        height: '700px',
      }}
    />
  );
}
