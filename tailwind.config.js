const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 PALETA PRINCIPAL TECNOLÓGICA - AZUL Y CIAN
        primary: {
          DEFAULT: '#1e40af',      // Azul tecnológico profesional
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',          // Color principal
          900: '#1e3a8a',
          950: '#172554'
        },

        secondary: {
          DEFAULT: '#0891b2',      // Cian tecnológico (complementario perfecto)
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',          // Color principal
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344'
        },

        accent: {
          DEFAULT: '#10b981',      // Verde tecnológico para éxito/velocidad
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22'
        },

        // 🔥 COLORES DE CONTRASTE MEJORADOS
        highlight: {
          DEFAULT: '#f59e0b',      // Naranja solo para highlights específicos
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

        // 💎 GRISES OPTIMIZADOS PARA MEJOR CONTRASTE
        neutral: {
          DEFAULT: '#64748b',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },

        // 🌟 COLORES PARA GLASSMORPHISM MEJORADOS
        glass: {
          'white-5': 'rgba(255, 255, 255, 0.05)',
          'white-10': 'rgba(255, 255, 255, 0.10)',
          'white-15': 'rgba(255, 255, 255, 0.15)',
          'white-20': 'rgba(255, 255, 255, 0.20)',
          'white-25': 'rgba(255, 255, 255, 0.25)',
          'primary-5': 'rgba(30, 64, 175, 0.05)',
          'primary-10': 'rgba(30, 64, 175, 0.10)',
          'primary-15': 'rgba(30, 64, 175, 0.15)',
          'secondary-5': 'rgba(8, 145, 178, 0.05)',
          'secondary-10': 'rgba(8, 145, 178, 0.10)',
          'secondary-15': 'rgba(8, 145, 178, 0.15)',
        },

        // ✅ COLORES DE ESTADO MEJORADOS
        success: {
          DEFAULT: '#10b981',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b'
        },

        warning: {
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

        error: {
          DEFAULT: '#ef4444',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        }
      },

      // 🎨 GRADIENTES MEJORADOS
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #0891b2 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #10b981 100%)',
        'gradient-tech': 'linear-gradient(135deg, #1e40af 0%, #0891b2 50%, #10b981 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1e40af 0%, #2563eb 25%, #0891b2 75%, #10b981 100%)',
      },

      // Resto de la configuración...
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },

      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
        'glass-sm': '12px',
        'glass-lg': '28px',
        'glass-xl': '40px',
      },

      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 20px 40px rgba(0, 0, 0, 0.15)',
        'glow-primary': '0 0 20px rgba(30, 64, 175, 0.3)',
        'glow-secondary': '0 0 20px rgba(8, 145, 178, 0.3)',
        'glow-accent': '0 0 20px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.glass-light': {
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        },
        '.glass-medium': {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(28px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};
