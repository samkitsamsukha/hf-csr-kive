/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF', // Primary color
          900: '#1E3A8A',
        },
        accent: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981', // Accent color
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        education: '#3B82F6',     // Blue
        healthcare: '#10B981',    // Green
        environment: '#059669',   // Dark Green
        vocational_training: '#F59E0B', // Amber
        women_empowerment: '#EC4899', // Pink
        elderly_support: '#8B5CF6', // Purple
        support_differently_abled: '#3730A3', // Indigo
        disaster_relief: '#EF4444', // Red
        animal_welfare: '#F97316', // Orange
      },
      boxShadow: {
        card: '0 2px 10px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 20px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
}