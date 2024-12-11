/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-gradient-to-r',
    'from-[#4AE8B0]',
    'to-[#25B086]',
    'from-[#0A66C2]',
    'via-[#00A3E1]',
    'to-[#FF4D4D]',
    'from-[#0066CC]',
    'to-[#0077CC]',
    'bg-clip-text',
    'text-transparent'
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        background: "var(--background)",
        text: "var(--text)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["SF Pro Display", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        heading: ["SF Pro Display", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        mono: ["SF Mono", "SFMono-Regular", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        'gradient-solutions': 'linear-gradient(45deg, #4AE8B0, #25B086)',
        'gradient-tools': 'linear-gradient(45deg, #0A66C2, #00A3E1, #FF4D4D)',
        'gradient-process': 'linear-gradient(45deg, #0066CC, #0077CC)',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
