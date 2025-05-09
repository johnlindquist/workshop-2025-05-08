/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/web/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/web/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/web/store/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/web/mocks/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/web/apps/web/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
