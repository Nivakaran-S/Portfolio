/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        invert: {
          css: {
            h1: {
              color: theme('colors.white'),
              fontSize: theme('fontSize.4xl'),
            },
            h2: { color: theme('colors.gray.100') },
            p: { color: theme('colors.gray.300') },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
