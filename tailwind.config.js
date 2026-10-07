/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sports: {
          primary: '#0f172a',    // Deep charcoal / almost black
          bg: '#f8f9fa',         // Warm off-white
          card: '#ffffff',       // Pure white card / panel
          accent: '#dc2626',     // Signature Crimson Red accent
          accentHover: '#b91c1c',
          muted: '#64748b',      // Muted slate gray
          border: '#e2e8f0',     // Subtle thin border
          darkBg: '#090d16',     // Night match dark background
          darkCard: '#111827',   // Night match card
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
        condensed: ['Barlow Condensed', 'Oswald', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
