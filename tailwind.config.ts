import { type Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 5.0s ease-out forwards",
      },
    },
  },
} satisfies Config;
