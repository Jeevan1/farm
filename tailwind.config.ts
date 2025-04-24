import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50', // Fresh green
        secondary: '#2E7D32', // Deep green
        accent: '#FBC02D', // Bright yellow
        muted: '#E0E0E0', // Neutral gray
        warm: '#8D6E63', // Earthy brown
        textdark: '#333333', // Rich text color
        background: '#FFFFFF', // White background
        foreground: '#171717', // Dark foreground
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '5rem',
          xl: '6rem',
          '2xl': '8rem',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
