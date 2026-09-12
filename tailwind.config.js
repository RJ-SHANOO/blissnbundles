/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Light, bright base system so the dark B&B logo mark keeps strong
        // contrast in the navbar/footer (see CLAUDE.md Section 1 & 4).
        base: "#FFFFFF",
        cream: "#FAF8F6",
        void: "#1A1A1A",
        surface: "#F5F1EC",
        surfaceAlt: "#EFEAE3",
        ink: "#1A1A1A",
        muted: "#5C5C5C",
        brand: {
          DEFAULT: "#9C3B4E",
          light: "#C97D89",
          dark: "#7A2E3A",
        },
        gold: {
          DEFAULT: "#D4A24C",
          light: "#E6C182",
          dark: "#A97E37",
        },
        mint: {
          DEFAULT: "#6FD1AC",
          light: "#A8E8CE",
          dark: "#4C9A7E",
        },
        lilac: {
          DEFAULT: "#C7A0D9",
          light: "#E2C8ED",
          dark: "#9670AC",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 30px -10px rgba(28, 20, 15, 0.12)",
        softLg: "0 24px 50px -15px rgba(28, 20, 15, 0.18)",
        gold: "0 8px 24px -8px rgba(212, 162, 76, 0.35)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.35)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out forwards",
        pop: "pop 0.35s ease-in-out",
      },
    },
  },
  plugins: [],
};
