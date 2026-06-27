/** @type {import('tailwindcss').Config} */

const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: withAlpha("--mu-canvas"),
        surface: withAlpha("--mu-surface"),
        "surface-raised": withAlpha("--mu-surface-raised"),
        line: withAlpha("--mu-line"),
        ink: withAlpha("--mu-ink"),
        "ink-soft": withAlpha("--mu-ink-soft"),
        "ink-faint": withAlpha("--mu-ink-faint"),

        primary: {
          DEFAULT: withAlpha("--mu-primary"),
          soft: withAlpha("--mu-primary-soft"),
          ink: withAlpha("--mu-primary-ink"),
        },
        accent: withAlpha("--mu-accent"),
        success: {
          DEFAULT: withAlpha("--mu-success"),
          soft: withAlpha("--mu-success-soft"),
        },
        warning: {
          DEFAULT: withAlpha("--mu-warning"),
          soft: withAlpha("--mu-warning-soft"),
        },
        danger: {
          DEFAULT: withAlpha("--mu-danger"),
          soft: withAlpha("--mu-danger-soft"),
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgb(15 40 70 / 0.04), 0 8px 24px -12px rgb(15 40 70 / 0.18)",
        raised:
          "0 2px 4px rgb(15 40 70 / 0.05), 0 18px 40px -16px rgb(15 40 70 / 0.28)",
        glow: "0 0 0 1px rgb(var(--mu-primary) / 0.18), 0 12px 32px -10px rgb(var(--mu-primary) / 0.45)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgb(var(--mu-success) / 0.5)" },
          "70%": { boxShadow: "0 0 0 8px rgb(var(--mu-success) / 0)" },
          "100%": { boxShadow: "0 0 0 0 rgb(var(--mu-success) / 0)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in": "scale-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-in": "slide-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};
