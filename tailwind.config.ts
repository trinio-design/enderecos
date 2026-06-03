import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cor de destaque Trinio
        trinio: "#fe4f30",
        success: "#38b74c",
        // Escala neutra (mapeada das variáveis do Figma)
        ink: {
          900: "#000000",
          700: "#1f2937",
          500: "#4b5563",
          400: "#6b7280",
          300: "#9ca3af",
          200: "#d1d5db",
          100: "#e5e7eb",
        },
      },
      borderColor: {
        DEFAULT: "rgba(0,0,0,0.16)",
        hairline: "rgba(0,0,0,0.16)",
      },
      borderRadius: {
        DEFAULT: "8px",
        card: "8px",
        pill: "1000px",
      },
      fontFamily: {
        sans: ["var(--font-albert-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        mobile: "375px",
      },
    },
  },
  plugins: [],
};

export default config;
