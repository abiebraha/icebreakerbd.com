/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Basic colors and states
    'text-primary',
    'text-secondary',
    'text-accent',
    'text-background',
    'text-foreground',
    'text-text',
    'text-muted',
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'bg-background',
    // Essential UI patterns
    {
      pattern: /(bg|text|border)-(slate|white|black|transparent)/,
      variants: ['hover', 'focus', 'active']
    },
    {
      pattern: /(bg|text|border)-(primary|secondary|accent|background|foreground|text|muted)/,
      variants: ['hover', 'focus', 'active']
    },
    // Animation classes
    {
      pattern: /animate-*/,
    },
    // Custom color classes used in components
    {
      pattern: /text-(\[#123e74\]|\[#1a4e8f\])/,
      variants: ['hover', 'focus']
    },
    {
      pattern: /bg-(\[#123e74\]|\[#1a4e8f\])/,
      variants: ['hover', 'focus']
    }
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          darker: "var(--primary-darker)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          lighter: "var(--secondary-lighter)",
        },
        accent: "var(--accent)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        text: "var(--text)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["SF Pro Display", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        heading: ["SF Pro Display", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        mono: ["SF Mono", "SFMono-Regular", "ui-monospace", "monospace"],
      },
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
