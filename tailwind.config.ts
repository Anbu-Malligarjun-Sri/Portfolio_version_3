import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Core void blacks
        void: {
          DEFAULT: "#050505",
          50: "#0a0a0a",
          100: "#0f0f0f",
          200: "#141414",
          300: "#1a1a1a",
          400: "#222222",
        },
        // Bio-emerald greens (life, biology, growth)
        emerald: {
          DEFAULT: "#00ff88",
          50: "#e6fff5",
          100: "#b3ffe0",
          200: "#80ffcc",
          300: "#4dffb8",
          400: "#1affa3",
          500: "#00ff88",
          600: "#00cc6d",
          700: "#009952",
          800: "#006637",
          900: "#00331b",
        },
        // Signature lime accent (energy, innovation)
        lime: {
          DEFAULT: "#c8ff00",
          400: "#d4ff33",
          500: "#c8ff00",
          600: "#a0cc00",
        },
        // Stark typography whites
        stark: {
          DEFAULT: "#f5f5f0",
          muted: "#a0a09b",
          dim: "#6b6b66",
        },
        // Deep olive undertones (organic, grounded)
        olive: {
          DEFAULT: "#3d4a3a",
          light: "#4a5a45",
          dark: "#2a332a",
        },
        // Cream for contrast sections
        cream: {
          DEFAULT: "#d4d3c4",
          light: "#e8e7dc",
          dark: "#b8b7a8",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        retro: ["var(--font-vt323)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 8rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display": ["clamp(2rem, 4vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "heading": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(0, 255, 136, 0.1)" },
          "100%": { boxShadow: "0 0 40px rgba(0, 255, 136, 0.3)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh": "radial-gradient(at 40% 20%, rgba(0, 255, 136, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(200, 255, 0, 0.05) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(0, 255, 136, 0.05) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
