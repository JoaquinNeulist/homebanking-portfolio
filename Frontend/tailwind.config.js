const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        flowbite.content(),
       "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    
    flowbite.plugin(),
  ],
};