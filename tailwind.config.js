/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        courie: {
          brick: "#992D26",
          "brick-hover": "#80261f",
          "brick-active": "#6b1f1a",
          cream: "#F9EBEA",
          "cream-deep": "#f0dedb",
          gold: "#E5B15F",
          "gold-hover": "#d9a24d",
          ink: "#2a1614",
          muted: "#5c4543",
        },
      },
      fontFamily: {
        sans: [
          "IBM Plex Sans",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(42, 22, 20, 0.14)",
      },
    },
  },
  plugins: [],
};
