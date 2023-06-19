/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    container: {
      center: true
    },
    screens: {
      'xl': {'max': '1280px'},

      'lg': {'max': '992px'},
      
      'lg--md': {'max': '900px'},

      'md': {'max': '768px'},

      'sm': {'max': '640px'},

      '--sm': {'max': '470px'},
    },
    fontFamily: {
      "poppins": "poppins Regular",
      "poppinsSemiBold": "poppins Semibold",
      "poppinsBold": "poppins Bold",
      "PoppinsMedium": "Poppins Medium"
    },
    extend: {
      colors: {
        "primary": "#ff902a",
        "secondary": "#2f2105",
        "extra": "#f9d9aa",
        "extraTwo": "#ffd28f",
        "btn-color": "#f4ae26",
        "description-color": "#7e7d7a"
      },
    },
  },
  plugins: [],
}

