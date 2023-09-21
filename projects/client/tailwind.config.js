/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.number-input::-webkit-inner-spin-button, .number-input::-webkit-outer-spin-button':
          {
            '-webkit-appearance': 'none',
            margin: '0'
          },
        '.number-input': {
          '-moz-appearance': 'textfield'
        }
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ]
}
