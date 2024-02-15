// import flowbitePlugin from 'flowbite/plugin';
// import tailwindScrollbar from 'tailwind-scrollbar';

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     'node_modules/flowbite-react/lib/esm/**/*.js',
//   ],
//   theme: {
//     extend: {},
//   },
//   darkMode: 'class',
//   plugins: [
//     require('flowbite/plugin'),
//     require('tailwind-scrollbar'),
//   ],
// }

// export default tailwindConfig;

import flowbitePlugin from 'flowbite/plugin';
import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    flowbitePlugin(),
    tailwindScrollbar(),
  ],
};

export default tailwindConfig;
