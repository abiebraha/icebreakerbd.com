/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    // Dynamic classes
    {
      pattern: /(bg|text|border|hover|focus|active)-(primary|secondary|accent|background|foreground|text|muted|slate|white|black|transparent|\[#.*?\])/,
      variants: ['hover', 'focus', 'active', 'group-hover', 'group-focus']
    },
    // Animation and transition classes
    {
      pattern: /(animate|transition|duration|ease|delay|transform|translate|scale|rotate|skew)-*/,
      variants: ['hover', 'focus', 'active']
    },
    // Layout and positioning
    {
      pattern: /(flex|grid|absolute|relative|fixed|sticky|inset|top|right|bottom|left|z|order|col|row)-*/,
      variants: ['hover', 'focus', 'active']
    },
    // Spacing and sizing
    {
      pattern: /(m|p|w|h|gap|space)-(auto|full|screen|\[.*?\]|\d+)/,
      variants: ['hover', 'focus', 'active']
    },
    // Typography
    {
      pattern: /(font|text|leading|tracking|align|whitespace|break|placeholder)-*/,
      variants: ['hover', 'focus', 'active']
    }
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          darker: "var(--primary-darker)"
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          lighter: "var(--secondary-lighter)"
        },
        accent: "var(--accent)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        text: "var(--text)",
        muted: "var(--muted)",
        border: "var(--border)"
      },
      fontFamily: {
        sans: ["SF Pro Display", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        heading: ["SF Pro Display", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        mono: ["SF Mono", "SFMono-Regular", "ui-monospace", "monospace"]
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    function({ addBase, theme }) {
      addBase({
        'html': { fontSize: '16px' },
        'body': {
          backgroundColor: theme('colors.background'),
          color: theme('colors.text'),
          lineHeight: '1.5'
        }
      })
    }
  ]
}
