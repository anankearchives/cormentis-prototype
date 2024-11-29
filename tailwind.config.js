/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        customGray: '#272B36',
        customPurple: '#C685D6',
        customLightGray: '#2F3340',
        customLightPurple: '#E3B8E8'
      },
      opacity: {
        '30': '0.3'
      },
      transitionProperty: {
        'blur': 'filter'
      },
      backdropBlur: {
        xs: '2px'
    },
  },
  plugins: [require("tailwindcss-animate")],
  variants: {
    extend: {
      opacity: ['group-hover'],
      blur: ['group-hover'],
      transform: ['group-hover']
    }
  }
}}