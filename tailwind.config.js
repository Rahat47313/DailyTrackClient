import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    // screens: {
    //   'xxs': '240px',
    //   'xs': '280px',
    //   'sm': '425px',
    //   // => @media (min-width: 640px) { ... }

    //   'md': '768px',
    //   // => @media (min-width: 768px) { ... }

    //   'lg': '1377px',
    //   // => @media (min-width: 1024px) { ... }

    //   'xl': '1280px',
    //   // => @media (min-width: 1280px) { ... }

    //   '2xl': '1536px',
    // },
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'gloria': ['Gloria Hallelujah', 'cursive'],
      },
      gridTemplateRows: {
        '24': 'repeat(24, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

