const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
import PrimeUI from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        // PRIMARIO (60%) - Azul Eléctrico Confiable
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#2563EB', // Color principal
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#1E3A8A',
          950: '#172554'
        },

        // SECUNDARIO (30%) - Amarillo Energético
        secondary: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15', // Color secundario principal
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
          950: '#422006'
        },

        // ACENTO (10%) - Naranja Vibrante
        accent: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // Color de acento
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407'
        },

        // ESTADOS DEL SISTEMA
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981', // Verde éxito
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B'
        },

        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24', // Amarillo advertencia
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F'
        },

        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444', // Rojo peligro
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D'
        },

        // NEUTRALES - Base sólida
        neutral: {
          50: '#FAFAFA',   // Blanco casi puro
          100: '#F5F5F5',  // Gris muy claro
          200: '#E5E5E5',  // Gris claro
          300: '#D4D4D4',  // Gris medio-claro
          400: '#A3A3A3',  // Gris medio
          500: '#737373',  // Gris neutro
          600: '#525252',  // Gris medio-oscuro
          700: '#404040',  // Gris oscuro
          800: '#262626',  // Gris muy oscuro
          900: '#171717',  // Casi negro
          950: '#0A0A0A'   // Negro profundo
        },

        // COLORES ESPECIALES
        electric: {
          blue: '#0EA5E9',    // Azul eléctrico
          yellow: '#FACC15',  // Amarillo energía
          orange: '#F97316',  // Naranja alta tensión
          green: '#22C55E',   // Verde seguro/conectado
          red: '#EF4444'      // Rojo peligro/desconectado
        }
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },

      // Animaciones para efectos eléctricos
      animation: {
        'pulse-electric': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },

      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #2563EB' },
          '100%': { boxShadow: '0 0 20px #2563EB, 0 0 30px #2563EB' }
        }
      }
    },
  },
  plugins: [PrimeUI]
};
