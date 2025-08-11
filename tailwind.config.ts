import { type Config } from "tailwindcss";
import typography from "npm:@tailwindcss/typography@0.5.10";

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
          "0%": { opacity: "0.01" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 2.0s ease-out forwards",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#2563eb',
              },
              textDecoration: 'none',
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'inherit',
              fontWeight: '600',
              lineHeight: 1.25,
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            'h1': { fontSize: '2.25em' },
            'h2': { fontSize: '1.75em' },
            'h3': { fontSize: '1.5em' },
            'h4': { fontSize: '1.25em' },
            'ul, ol': {
              paddingLeft: '1.5em',
              marginTop: '1em',
              marginBottom: '1em',
            },
            'code': {
              backgroundColor: 'rgba(175, 184, 193, 0.2)',
              borderRadius: '0.25em',
              padding: '0.2em 0.4em',
              fontSize: '0.9em',
            },
            'pre': {
              backgroundColor: '#1e293b',
              borderRadius: '0.5em',
              padding: '1em',
              overflowX: 'auto',
              marginTop: '1em',
              marginBottom: '1em',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
              borderRadius: 0,
            },
            'blockquote': {
              borderLeft: '4px solid #e2e8f0',
              paddingLeft: '1em',
              fontStyle: 'italic',
              color: '#64748b',
              margin: '1.5em 0',
            },
            'img': {
              borderRadius: '0.5em',
              marginTop: '1.5em',
              marginBottom: '1.5em',
              maxWidth: '100%',
              height: 'auto',
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
} satisfies Config;
