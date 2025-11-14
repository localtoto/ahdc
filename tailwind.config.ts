import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in": {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "slide-down": {
          from: {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          from: {
            opacity: "0",
            transform: "scale(0.9)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "0.2",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.4",
            transform: "scale(1.1)",
          },
        },
        "draw-path": {
          from: {
            opacity: "0",
            transform: "scale(0.8)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "slide-up": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "twinkle": {
          "0%, 100%": {
            opacity: "0.3",
          },
          "50%": {
            opacity: "1",
          },
        },
        "slide-in-left": {
          from: {
            opacity: "0",
            transform: "translateX(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-delay": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        "float-3d": {
          "0%, 100%": {
            transform: "translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg)",
          },
          "25%": {
            transform: "translateY(-10px) translateZ(20px) rotateX(2deg) rotateY(-2deg)",
          },
          "50%": {
            transform: "translateY(-5px) translateZ(10px) rotateX(-1deg) rotateY(2deg)",
          },
          "75%": {
            transform: "translateY(-15px) translateZ(25px) rotateX(1deg) rotateY(-1deg)",
          },
        },
        "gradient-shift": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "text-glow": {
          "0%, 100%": {
            "text-shadow": "0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2), 0 5px 15px rgba(0, 0, 0, 0.3)",
          },
          "50%": {
            "text-shadow": "0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3), 0 10px 25px rgba(0, 0, 0, 0.4)",
          },
        },
        "perspective-3d": {
          "0%, 100%": {
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)",
          },
          "25%": {
            transform: "perspective(1000px) rotateX(3deg) rotateY(-3deg) translateZ(30px)",
          },
          "50%": {
            transform: "perspective(1000px) rotateX(-2deg) rotateY(2deg) translateZ(20px)",
          },
          "75%": {
            transform: "perspective(1000px) rotateX(2deg) rotateY(-2deg) translateZ(25px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "slide-down": "slide-down 0.4s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "draw-path": "draw-path 1s ease-out both",
        "slide-up": "slide-up 0.8s ease-out both",
        "twinkle": "twinkle 2s ease-in-out infinite",
        "slide-in-left": "slide-in-left 0.5s ease-out both",
        "fade-in-delay": "fade-in-delay 0.5s ease-out both",
        "float-3d": "float-3d 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "text-glow": "text-glow 3s ease-in-out infinite",
        "perspective-3d": "perspective-3d 4s ease-in-out infinite",
      },
      boxShadow: {
        "card": "var(--card-shadow)",
        "card-hover": "var(--card-shadow-hover)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
