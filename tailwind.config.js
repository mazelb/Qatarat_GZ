/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palestinian flag colors
        'palestine': {
          'black': '#000000',
          'white': '#FFFFFF',
          'green': '#007A3D',
          'red': '#CE1126'
        },
      },
      backgroundImage: {
        'kuffiyeh-pattern': "url('/images/patterns/kuffiyeh-pattern.png')",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.palestine.red'),
              '&:hover': {
                color: theme('colors.red.700'),
              },
            },
            h1: {
              color: theme('colors.gray.900'),
            },
            h2: {
              color: theme('colors.gray.800'),
            },
            h3: {
              color: theme('colors.gray.800'),
            },
            blockquote: {
              borderLeftColor: theme('colors.palestine.red'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
