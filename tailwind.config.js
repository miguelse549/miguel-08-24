/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      dropShadow: {
        personalized: "0 0 10px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};
