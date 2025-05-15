// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        // Animasi float vertikal (default)
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10%)" },
        },

        // 🔥 Animasi float wave (kiri-kanan + atas-bawah)
        "float-wave": {
          "0%, 100%": { transform: "translateY(-10%) translateX(0)" },
          "25%": { transform: "translateY(0) translateX(20px)" },
          "50%": { transform: "translateY(10%) translateX(0)" },
          "75%": { transform: "translateY(0) translateX(-20px)" },
        },
      },

      animation: {
        float: "float 3s ease-in-out infinite",
        "float-wave": "float-wave 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
