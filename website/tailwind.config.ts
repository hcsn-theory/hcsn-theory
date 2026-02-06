import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'md-primary': '#1f51ff',      // Material Design blue
        'md-surface': '#fffbfe',      // Material Design surface
        'md-on-surface': '#1c1b1f',   // Material Design on-surface
        'md-outline': '#79747e',      // Material Design outline
        'md-success': '#21a029',      // Material Design green
        'md-warning': '#f57c00',      // Material Design orange
        'md-error': '#b3261e',        // Material Design red
        neutral: {
          50: '#f8f9fa',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#525252',
            a: {
              color: '#1e40af',
              '&:hover': {
                color: '#1e3a8a',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
