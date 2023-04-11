/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        main: {

          "primary": "#3a86ff",

          "secondary": "#fb5607",

          "accent": "#fcf300",

          "neutral": "#000000",

          "base-100": "#FFFFFF",

          "info": "#3ABFF8",

          "success": "#36D399",

          "warning": "#FBBD23",

          "error": "#F87272",

          "primary2": "#0055DE",

          "secondary2": "#B73C03",

          "accent2": "#D6CF00",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
  ],
}

