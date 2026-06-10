/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Anton", "Impact", "Haettenschweiler", "sans-serif"],
        sans: [
          "Space Grotesk",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      colors: {
        mustard: "#F4D068",
        "mustard-deep": "#EFBE3F",
        ink: "#0B0B0B",
        cream: "#FDFBF7",
        paper: "#F6F1E7",
        ok: "#79B473",
        bad: "#FF6B5B",
      },
      boxShadow: {
        brutal: "6px 6px 0 0 #0B0B0B",
        "brutal-sm": "3px 3px 0 0 #0B0B0B",
        "brutal-lg": "10px 10px 0 0 #0B0B0B",
        "brutal-cream": "6px 6px 0 0 #FDFBF7",
        "brutal-mustard": "6px 6px 0 0 #F4D068",
      },
      letterSpacing: {
        meta: "0.14em",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pop: {
          "0%": { transform: "scale(0.4)", opacity: "0" },
          "55%": { transform: "scale(1.12)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "scale-in": "scale-in 0.22s ease-out both",
        pop: "pop 0.45s cubic-bezier(0.34,1.56,0.64,1) both",
        "slide-up": "slide-up 0.4s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
