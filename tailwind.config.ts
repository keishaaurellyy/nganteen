import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/styles/**/*.css" ],
  theme: {
    colors: {
      // Color Brand
      primary: {
        100: '#FFF7E3',
        200: '#FFE8AA',
        300: '#FFD35C',
        400: '#FFC939',
        500: '#FFBA00',
        600: '#C69100',
        700: '#8E6700',
        800: '#553E00',
        900: '#1C1500',
      },
      secondary: {
        100: '#FEEAE4',
        200: '#FBC1AE',
        300: '#F89879',
        400: '#F56F43',
        500: '#F35623',
        600: '#BC360A',
        700: '#862607',
        800: '#511704',
        900: '#1B0801',
      },
      tertiary: {
        100: '#E9F8EA',
        200: '#BDECC1',
        300: '#92DF97',
        400: '#66D26E',
        500: '#3AC544',
        600: '#2F9E37',
        700: '#206D26',
        800: '#134117',
        900: '#061608',
      },

      // Color Base
      neutral: {
        100: '#FFFFFF',
        200: '#F2F2F2',
        300: '#EAEAEA',
        400: '#E0E0E0',
        500: '#C2C2C2',
        600: '#9F9F9F',
        700: '#636363',
        800: '#3A3A3A',
        900: '#000000',
      },

      // Color System
      error: {
        light: '#FD5839',
        medium: '#E03616',
        dark: '#BB2D13',
      },
      success: {
        light: '#24DD7D',
        medium: '#00AF54',
        dark: '#0F8849',
      },
      warning: {
        light: '#FFDF6C',
        medium: '#FFD53F',
        dark: '#F1C21B',
      },
    },
    extend: {
      fontSize: {
        '2xs': ['10px', '14px'],
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '22px'],
        'lg': ['18px', '24px'],
        '2xl': ['24px', '28px'],
        '4xl': ['36px', '40px'],
      },
      
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'], // Ganti default
      },
    },
  },
  plugins: [],
}


export default config;