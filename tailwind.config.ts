import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:   '#061325',
        navy2:  '#0C2040',
        navy3:  '#112850',
        blue:   '#1440A0',
        blue2:  '#1E54C8',
        gold:   '#F5B800',
        gold2:  '#FFD040',
        off:    '#F4F1EB',
        gray:   '#7A8FA8',
        muted:  '#4A5E78',
        green:  '#10B981',
        red:    '#EF4444',
      },
      fontFamily: {
        bebas:  ['var(--font-bebas)', 'sans-serif'],
        lora:   ['var(--font-lora)', 'serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
      animation: {
        fadeUp:    'fadeUp 0.6s ease both',
        fadeIn:    'fadeIn 0.4s ease both',
        pulse2:    'pulse2 2s ease-in-out infinite',
        shimmer:   'shimmer 3s linear infinite',
        floatY:    'floatY 4s ease-in-out infinite',
        barGrow:   'barGrow 1.2s ease-out forwards',
        scaleFill: 'scaleFill 1.5s ease-out forwards',
      },
      keyframes: {
        fadeUp:    { from: { opacity: '0', transform: 'translateY(28px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        pulse2:    { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '.5', transform: 'scale(1.5)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        floatY:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        barGrow:   { from: { width: '0' }, to: { width: 'var(--w)' } },
        scaleFill: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
    },
  },
  plugins: [],
};

export default config;
