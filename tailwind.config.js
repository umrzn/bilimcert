/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        mlg: "900px", // New intermediate breakpoint
        lg: "1024px",
        xl: "1200px", // Updated to match the design requirement
        "2xl": "1200px", // Cap at 1200px for desktop
      },
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      mlg: "900px", // New intermediate breakpoint
      lg: "1024px",
      xl: "1200px", // Updated to match the design requirement
      "2xl": "1400px",
    },
    extend: {
      colors: {
        // BilimCert brand colors
        primary: {
          DEFAULT: "#003366",
          50: "#E6EDF5",
          100: "#CCDAEB",
          200: "#99B5D6",
          300: "#6690C2",
          400: "#336BAD",
          500: "#003366", // Main primary color
          600: "#002E5C",
          700: "#002952",
          800: "#002447",
          900: "#001F3D",
          950: "#001A33",
        },
        secondary: {
          DEFAULT: "#FF6600",
          50: "#FFF0E6",
          100: "#FFE1CC",
          200: "#FFC399",
          300: "#FFA566",
          400: "#FF8733",
          500: "#FF6600", // Main secondary color
          600: "#E65C00",
          700: "#CC5200",
          800: "#B34700",
          900: "#993D00",
          950: "#803300",
        },
        // Keep the shadcn/ui compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        // New animations for slide effects
        "slide-in-right": {
          from: { transform: "translateX(100%)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        "slide-out-right": {
          from: { transform: "translateX(0)", opacity: 1 },
          to: { transform: "translateX(100%)", opacity: 0 },
        },
        "slide-out-left": {
          from: { transform: "translateX(0)", opacity: 1 },
          to: { transform: "translateX(-100%)", opacity: 0 },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.8)", opacity: 0 },
          "70%": { transform: "scale(1.05)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 },
        },
        "fade-in-out": {
          "0%": { opacity: 0 },
          "10%": { opacity: 1 },
          "90%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // New animations
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "slide-out-right": "slide-out-right 0.5s ease-out",
        "slide-out-left": "slide-out-left 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "bounce-in": "bounce-in 0.5s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "fade-in-out": "fade-in-out 3s ease-in-out",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dot-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0tNiAwaC02VjBoNnYzMHptLTYgMGgtNlYwaDZ2MzB6Ii8+PC9nPjwvZz48L3N2Zz4=')",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
}
