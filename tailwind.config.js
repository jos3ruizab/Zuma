/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        border: "var(--color-border)", /* Coffee Brown 20% - brown-700 */
        input: "var(--color-input)", /* Coffee Brown 20% - brown-700 */
        ring: "var(--color-ring)", /* Venezuelan Gold - yellow-600 */
        background: "var(--color-background)", /* Warm White - gray-50 */
        foreground: "var(--color-foreground)", /* Cacao Dark - brown-900 */
        primary: {
          DEFAULT: "var(--color-primary)", /* Venezuelan Gold - yellow-600 */
          foreground: "var(--color-primary-foreground)", /* Cacao Dark - brown-900 */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* Coffee Brown - brown-700 */
          foreground: "var(--color-secondary-foreground)", /* Warm White - gray-50 */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* Muted Red - red-800 */
          foreground: "var(--color-destructive-foreground)", /* Warm White - gray-50 */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* Cream - stone-100 */
          foreground: "var(--color-muted-foreground)", /* Medium Brown - brown-600 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* Forest Green - green-800 */
          foreground: "var(--color-accent-foreground)", /* Warm White - gray-50 */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* Warm White - gray-50 */
          foreground: "var(--color-popover-foreground)", /* Cacao Dark - brown-900 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* Cream - stone-100 */
          foreground: "var(--color-card-foreground)", /* Cacao Dark - brown-900 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* Deep Green - green-900 */
          foreground: "var(--color-success-foreground)", /* Warm White - gray-50 */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* Dark Gold - yellow-700 */
          foreground: "var(--color-warning-foreground)", /* Cacao Dark - brown-900 */
        },
        error: {
          DEFAULT: "var(--color-error)", /* Muted Red - red-800 */
          foreground: "var(--color-error-foreground)", /* Warm White - gray-50 */
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        caption: ['Source Sans Pro', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
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
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
