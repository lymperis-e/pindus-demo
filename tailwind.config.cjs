module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  plugins: [require("@tailwindcss/typography"), require('daisyui')],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: ["aqua", "cupcake", "forest", "coffee", "retro"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "cupcake",
  },

};
