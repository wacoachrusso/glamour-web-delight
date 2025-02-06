import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#F8D7D7", // Soft Pink
          dark: "#EABFB9", // Blush
          foreground: "#1A1A1A",
        },
        secondary: {
          DEFAULT: "#D4AF37", // Gold
          light: "#F5E1A4", // Light Gold
          foreground: "#FAF9F6",
        },
        accent: {
          DEFAULT: "#EABFB9", // Blush
          foreground: "#1A1A1A",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#FAF9F6", // Off-White
          foreground: "#1A1A1A",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'radiant-light': 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
        'radiant-warm': 'linear-gradient(to right, #ee9ca7, #ffdde1)',
        'radiant-gold': 'linear-gradient(to right, #D4AF37 0%, #F5E1A4 100%)',
        'elegant-fade': 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
        'soft-overlay': 'linear-gradient(to bottom, rgba(248,215,215,0.1), rgba(212,175,55,0.05))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        cormorant: ["Cormorant Garamond", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1A1A1A',
            a: {
              color: '#D4AF37',
              '&:hover': {
                color: '#F5E1A4',
              },
            },
            h1: {
              fontFamily: 'Cormorant Garamond, serif',
            },
            h2: {
              fontFamily: 'Cormorant Garamond, serif',
            },
            h3: {
              fontFamily: 'Cormorant Garamond, serif',
            },
          },
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;