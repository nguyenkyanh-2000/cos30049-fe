// Import the Config type from Tailwind CSS
import type { Config } from "tailwindcss";

// Export the Tailwind CSS configuration
export default {
  // Enable dark mode based on a class
  darkMode: ["class"],
  // Specify the paths to all of the template files in the project
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Define the theme configuration
  theme: {
    // Set the default sans-serif font family
    fontFamily: {
      sans: ["Figtree", "sans-serif"],
    },
    // Extend the default theme
    extend: {
      // Add additional font families
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      // Define custom colors using CSS variables
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
      },
      // Define custom border radius values using CSS variables
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Define custom animations
      animation: {
        blob: "blob 4s infinite",
        blob2: "blob2 4s infinite",
        blob3: "blob3 4s infinite",
      },
      // Define custom keyframes for animations
      keyframes: {
        blob: {
          "0%": {
            transform: "scale(1) translate(-50%, -50%)",
          },
          "33%": {
            transform: "scale(1.05) translate(3rem, -5rem)",
          },
          "66%": {
            transform: "scale(0.95) translate(-2rem, 3rem)",
          },
          "100%": {
            transform: "scale(1) translate(-50%, -50%)",
          },
        },
        blob2: {
          "0%": {
            transform: "scale(1) translate(-50%, -100%)",
          },
          "33%": {
            transform: "scale(1.05) translate(-2rem, -3rem)",
          },
          "66%": {
            transform: "scale(0.95) translate(1.5rem, 2rem)",
          },
          "100%": {
            transform: "scale(1) translate(-50%, -100%)",
          },
        },
        blob3: {
          "0%": {
            transform: "scale(1) translate(-100%, -50%)",
          },
          "33%": {
            transform: "scale(1.1) translate(-4rem, 3rem)",
          },
          "66%": {
            transform: "scale(0.95) translate(3rem, -4rem)",
          },
          "100%": {
            transform: "scale(1) translate(-100%, -50%)",
          },
        },
      },
    },
  },
  // Include the Tailwind CSS animate plugin
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
