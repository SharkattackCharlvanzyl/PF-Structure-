import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // PropertyFinder brand colors
        navy: {
          DEFAULT: "#141c2b",
          light: "#1a2535",
          dark: "#0f1520",
        },
        gold: {
          DEFAULT: "#c4a47c",
          light: "#d4b98c",
          dark: "#b8976a",
          muted: "rgba(196,164,124,0.15)",
        },
        cream: {
          DEFAULT: "#e8dfc8",
          dark: "#1a1408",
        },
        muted: {
          DEFAULT: "#8a7d5a",
        },
      },
      fontFamily: {
        display: ['"Cinzel"', "serif"],
        sans: ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
