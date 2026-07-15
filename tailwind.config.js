/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        yesilayGreen: '#0B8F4A',
        yesilayDark: '#076938',
        yesilayLight: '#E8F7EF',
        surface: '#F7FBF8',
        textMain: '#103022',
        textMuted: '#5C6F66',
        riskLow: '#16A34A',
        riskMedium: '#F59E0B',
        riskHigh: '#DC2626',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(11, 143, 74, 0.12)',
      },
    },
  },
  plugins: [],
};
