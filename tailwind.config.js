/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0a1628',
          900: '#0f1f3d',
          800: '#16294f',
          700: '#1e3a5f',
          600: '#2c4f7c',
          500: '#3d6494',
        },
        amber: {
          50: '#fdf6ec',
          100: '#faebd2',
          300: '#f0c178',
          400: '#e8a94f',
          500: '#d68a2d',
          600: '#b56f1f',
        },
      },
    },
  },
  plugins: [],
}