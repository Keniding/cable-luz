const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81'
        },
        secondary: {
          DEFAULT: '#f59e0b',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        accent: {
          DEFAULT: '#06b6d4',
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      // Dimensiones personalizadas
      width: {
        '15': '3.75rem',   // 60px
        '18': '4.5rem',    // 72px
        '25': '6.25rem',   // 100px
        '30': '7.5rem',    // 120px
        '38': '9.5rem',    // 152px
        '50': '12.5rem',   // 200px
        '60': '15rem',     // 240px
        '75': '18.75rem',  // 300px
        '100': '25rem',    // 400px
        '125': '31.25rem', // 500px
      },
      height: {
        '15': '3.75rem',   // 60px
        '18': '4.5rem',    // 72px
        '25': '6.25rem',   // 100px
        '30': '7.5rem',    // 120px
        '38': '9.5rem',    // 152px
        '50': '12.5rem',   // 200px
        '60': '15rem',     // 240px
        '75': '18.75rem',  // 300px
        '100': '25rem',    // 400px
        '125': '31.25rem', // 500px
      },
      spacing: {
        '15': '3.75rem',
        '18': '4.5rem',
        '25': '6.25rem',
        '30': '7.5rem',
        '38': '9.5rem',
        '50': '12.5rem',
        '60': '15rem',
        '75': '18.75rem',
        '100': '25rem',
        '125': '31.25rem',
      },
      // DURACIONES PERSONALIZADAS AGREGADAS
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'gradient': 'gradient 3s ease infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.8)' }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
};
