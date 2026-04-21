import type { Config } from 'tailwindcss'

/* ── Color Palette ───────────────────────────────────
 *  Edit the `brand` colors to match your company identity.
 *  The default palette is a professional mint / navy scheme.
 * ──────────────────────────────────────────────────── */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf9',
          100: '#ccfbef',
          200: '#99f6db',
          300: '#5ceac5',
          400: '#2dd4aa',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
