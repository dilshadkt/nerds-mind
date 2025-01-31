/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
        safisfy: ["Satisfy", "sans-serif"],
        taprom: ["Taprom", "sans-serif"],
      },
    },
  },
  plugins: [],
};
