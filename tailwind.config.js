
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx,css,scss}", "./index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      minHeight: {
        'screen-minus-4rem': 'calc(100vh - 20vh - 12rem )',
      },
      height:{
        'input-box': 'calc(100vh - 20vh - 1rem - 2.2rem - 2rem)',
      },
      backgroundImage: {
        'login': "url('../assets/login.jpg')",
      }
    },
  },
  plugins: [],
};
