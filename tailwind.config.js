const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: colors.slate,
        background: colors.slate,
        primary: colors.teal,
        secondary: colors.indigo,
        success: colors.emerald,
        info: colors.sky,
        warning: colors.amber,
        danger: colors.red,
      },
    },
  },
  plugins: [],
};
