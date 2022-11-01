/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "stripes": "linear-gradient(135deg,#6b728080 10%,transparent 0,transparent 50%,#6b728080 0,#6b728080 60%,transparent 0,transparent);",
      },
      backgroundSize: {
        "04": "4px 4px",
        "07": "7px 7px",
      },
    },
  },
  plugins: [],
}
