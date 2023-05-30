module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  plugins: [require("@tailwindcss/typography"), require('daisyui')],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [ "garden", //"aqua", "cupcake", "forest", "coffee", "retro",
    {
      "pindus": {
        ...require("daisyui/src/colors/themes")["[data-theme=retro]"],

        "primary": "#344e3e",
        "secondary": "#94ceff",
        "accent": "#fac1a0",
        "neutral": "#e9e7e7",
        "base-100": "#b9e1d9",

        "primary-focus": "#154474",
        ".btn-primary": {
          "color": "#b9e1da"
        },
        ".btn-primary:hover": {
          'background-color': '#154474',
          'border-color': '#154474',
        },
        ".btn-ghost:hover": {
          "background": "transparent",
          "border-color": "#94cdff"
        }
      },
    },
  ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "cupcake",
  },

};
