/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx,css,scss}", "./index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      minHeight: {
        'screen-minus-4rem': 'calc(100vh - 4rem)',
      },
    },
  },
  plugins: [],
};
