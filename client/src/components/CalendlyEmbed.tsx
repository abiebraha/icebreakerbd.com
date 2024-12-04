export default function CalendlyEmbed() {
  return (
    <div 
      className="calendly-inline-widget" 
      data-url={import.meta.env.VITE_CALENDLY_URL}
      style={{
        minWidth: '320px',
        height: '700px',
      }}
    />
  );
}
