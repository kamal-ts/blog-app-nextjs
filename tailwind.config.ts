import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    '!./src/components/Content.tsx',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'sans': ['"Proxima Nova"'],
      },
    },
  },
  plugins: [
    daisyui,
    typography,
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwindcss-motion'), 
  ],
  daisyui: {
    themes: ["light", "dark", "cmyk", "winter", "lemonade", "coffee", "retro", "lofi"],
  },
};
export default config;
