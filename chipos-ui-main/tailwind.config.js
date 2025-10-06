module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: "selector",
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
        // Cyberpunk color palette
        cyber: {
          cyan: "hsl(var(--cyber-cyan))",
          magenta: "hsl(var(--cyber-magenta))",
          yellow: "hsl(var(--cyber-yellow))",
          green: "hsl(var(--cyber-green))",
          red: "hsl(var(--cyber-red))",
          purple: "hsl(var(--cyber-purple))",
          orange: "hsl(var(--cyber-orange))",
          black: "hsl(var(--cyber-black))",
          dark: "hsl(var(--cyber-dark))",
          darker: "hsl(var(--cyber-darker))",
        },
        // ChipOS golden circuit board colors (from icon)
        chipos: {
          gold: "hsl(var(--chipos-gold))",
          amber: "hsl(var(--chipos-amber))",
          copper: "hsl(var(--chipos-copper))",
          circuit: "hsl(var(--chipos-circuit))",
          black: "hsl(var(--cyber-black))",
          dark: "hsl(var(--cyber-dark))",
        },
        // Legacy chip colors for compatibility
        chip: {
          gold: "hsl(var(--chipos-gold))",
          copper: "hsl(var(--chipos-copper))",
          silver: "hsl(var(--cyber-cyan))",
          dark: "hsl(var(--cyber-dark))",
          trace: "hsl(var(--chipos-circuit))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        cyber: ['Orbitron', 'Exo 2', 'Rajdhani', 'monospace'],
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
        // Cyberpunk animations
        "glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "neon-flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { 
            textShadow: "0 0 5px hsl(var(--cyber-cyan)), 0 0 10px hsl(var(--cyber-cyan)), 0 0 15px hsl(var(--cyber-cyan)), 0 0 20px hsl(var(--cyber-cyan))"
          },
          "20%, 24%, 55%": { textShadow: "none" },
        },
        "cyber-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 5px hsl(var(--cyber-cyan) / 0.5), 0 0 10px hsl(var(--cyber-cyan) / 0.3), 0 0 20px hsl(var(--cyber-cyan) / 0.1)"
          },
          "50%": { 
            boxShadow: "0 0 10px hsl(var(--cyber-cyan) / 0.7), 0 0 20px hsl(var(--cyber-cyan) / 0.5), 0 0 30px hsl(var(--cyber-cyan) / 0.3)"
          },
        },
        "matrix-rain": {
          "0%": { transform: "translateY(-100vh)", opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        "scan-line": {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
        "holographic-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "data-stream": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "shimmer-slide": {
          "to": {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "shimmer": "shimmer 2s infinite",
        // Magic UI animations
        "shimmer-slide": "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        // Cyberpunk animations
        "glitch": "glitch 0.3s ease-in-out infinite",
        "neon-flicker": "neon-flicker 1.5s infinite linear",
        "cyber-pulse": "cyber-pulse 2s ease-in-out infinite",
        "matrix-rain": "matrix-rain 3s linear infinite",
        "scan-line": "scan-line 2s ease-in-out infinite",
        "holographic": "holographic-shift 3s ease infinite",
        "data-stream": "data-stream 2s linear infinite",
      },
      textShadow: {
        'neon-cyan': '0 0 5px hsl(var(--cyber-cyan)), 0 0 10px hsl(var(--cyber-cyan)), 0 0 15px hsl(var(--cyber-cyan))',
        'neon-magenta': '0 0 5px hsl(var(--cyber-magenta)), 0 0 10px hsl(var(--cyber-magenta)), 0 0 15px hsl(var(--cyber-magenta))',
        'neon-yellow': '0 0 5px hsl(var(--cyber-yellow)), 0 0 10px hsl(var(--cyber-yellow)), 0 0 15px hsl(var(--cyber-yellow))',
      },
      boxShadow: {
        'neon-cyan': '0 0 5px hsl(var(--cyber-cyan)), 0 0 10px hsl(var(--cyber-cyan)), 0 0 20px hsl(var(--cyber-cyan) / 0.3)',
        'neon-magenta': '0 0 5px hsl(var(--cyber-magenta)), 0 0 10px hsl(var(--cyber-magenta)), 0 0 20px hsl(var(--cyber-magenta) / 0.3)',
        'neon-yellow': '0 0 5px hsl(var(--cyber-yellow)), 0 0 10px hsl(var(--cyber-yellow)), 0 0 20px hsl(var(--cyber-yellow) / 0.3)',
        'cyber-inset': 'inset 0 0 10px hsl(var(--cyber-cyan) / 0.2), inset 0 0 20px hsl(var(--cyber-magenta) / 0.1)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-neon-cyan': {
          textShadow: '0 0 2px hsl(var(--cyber-cyan) / 0.4), 0 0 4px hsl(var(--cyber-cyan) / 0.2)',
        },
        '.text-shadow-neon-magenta': {
          textShadow: '0 0 2px hsl(var(--cyber-magenta) / 0.4), 0 0 4px hsl(var(--cyber-magenta) / 0.2)',
        },
        '.text-shadow-neon-yellow': {
          textShadow: '0 0 2px hsl(var(--cyber-yellow) / 0.4), 0 0 4px hsl(var(--cyber-yellow) / 0.2)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}