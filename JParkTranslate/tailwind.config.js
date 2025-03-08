/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pickled-bluewood': {
          '50': '#f5f7fa',
          '100': '#eaeef4',
          '200': '#d1dce6',
          '300': '#a8bed1',
          '400': '#799bb7',
          '500': '#597e9f',
          '600': '#456684',
          '700': '#39516b',
          '800': '#34495e',
          '900': '#2d3c4d',
          '950': '#1e2833',
        },
      },
    },
  },
  plugins: [],
}