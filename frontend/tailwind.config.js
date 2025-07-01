/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        eduAltTheme: {
          primary: "#166534", // ✅ Dark green (tailwind's green-800)
          "primary-content": "#ffffff",
          secondary: "#22c55e", // ✅ Light green (tailwind's green-500) for hover or accents
          "base-100": "#ffffff",
          accent: "#bbf7d0", // Extra light green
          neutral: "#3d4451",
          info: "#3abff8",
          success: "#22c55e",
          warning: "#facc15",
          error: "#ef4444",
        },
      },
    ],
    defaultTheme: "eduAltTheme",
  },
};
