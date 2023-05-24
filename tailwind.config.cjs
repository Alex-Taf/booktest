/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  prefix: 'tw-',
  corePlugins: {
    preflight: false
  },
  content: [
    "./index.html",
    "./src/**/*.{html,js,vue,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
}
