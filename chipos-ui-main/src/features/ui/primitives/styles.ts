/**
 * Shared style utilities for Radix primitives
 * Chip/Circuit Board-inspired design system
 *
 * Theme Support:
 * - All styles use Tailwind's dark: prefix for automatic theme switching
 * - Theme is managed by ThemeContext (light/dark)
 * - For runtime theme values, use useThemeAware hook
 */

// Base chip/circuit board classes with 2025 matte embossed design
export const glassmorphism = {
  // Background variations - Sophisticated matte chip surfaces
  background: {
    subtle: "bg-gradient-to-br from-gray-100/85 via-gray-50/70 to-gray-200/50 dark:from-chip-dark/95 dark:via-gray-900/80 dark:to-black/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_rgba(255,184,77,0.15)] shadow-[0_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-gray-200/60 dark:border-chip-silver/20",
    strong: "bg-gradient-to-br from-gray-200/90 via-gray-100/80 to-gray-300/60 dark:from-gray-900/95 dark:via-chip-dark/90 dark:to-black/95 shadow-[inset_0_2px_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_2px_0_rgba(255,184,77,0.2)] shadow-[0_4px_8px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_8px_rgba(0,0,0,0.4)] border border-gray-200/70 dark:border-chip-silver/25",
    card: "bg-gradient-to-br from-gray-100/90 via-gray-50/75 to-gray-200/55 dark:from-chip-dark/98 dark:via-gray-900/85 dark:to-black/95 shadow-[inset_0_2px_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_2px_0_rgba(255,184,77,0.2)] shadow-[0_6px_12px_rgba(0,0,0,0.2)] dark:shadow-[0_6px_12px_rgba(0,0,0,0.5)] border border-gray-200/70 dark:border-chip-silver/20",
    // Sophisticated colored backgrounds with embossed depth
    gold: "bg-gradient-to-br from-chip-gold/15 via-chip-gold/8 to-chip-gold/20 dark:from-chip-gold/25 dark:via-chip-gold/15 dark:to-chip-gold/30 shadow-[inset_0_2px_0_rgba(255,184,77,0.3)] shadow-[0_4px_8px_rgba(255,184,77,0.2)] border border-chip-gold/40 dark:border-chip-gold/35",
    copper: "bg-gradient-to-br from-chip-copper/15 via-chip-copper/8 to-chip-copper/20 dark:from-chip-copper/25 dark:via-chip-copper/15 dark:to-chip-copper/30 shadow-[inset_0_2px_0_rgba(184,115,51,0.3)] shadow-[0_4px_8px_rgba(184,115,51,0.2)] border border-chip-copper/40 dark:border-chip-copper/35",
    silver: "bg-gradient-to-br from-chip-silver/15 via-chip-silver/8 to-chip-silver/20 dark:from-chip-silver/25 dark:via-chip-silver/15 dark:to-chip-silver/30 shadow-[inset_0_2px_0_rgba(192,192,192,0.3)] shadow-[0_4px_8px_rgba(192,192,192,0.2)] border border-chip-silver/40 dark:border-chip-silver/35",
  },

  // Ambient glow systems for 2025 depth effects
  glow: {
    subtle: "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-chip-gold/10 before:via-transparent before:to-chip-copper/5 before:blur-sm before:opacity-40 before:scale-110 before:-z-10",
    moderate: "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-chip-gold/20 before:via-transparent before:to-chip-copper/10 before:blur-md before:opacity-60 before:scale-110 before:-z-10 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-br after:from-chip-gold/15 after:via-chip-gold/5 after:to-transparent after:blur-sm after:opacity-30 after:scale-105 after:-z-10",
    intense: "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-chip-gold/25 before:via-transparent before:to-chip-copper/15 before:blur-lg before:opacity-80 before:scale-115 before:-z-10 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-br after:from-chip-gold/30 after:via-chip-gold/10 after:to-transparent after:blur-md after:opacity-50 after:scale-110 after:-z-10",
  },

  // Border styles with metallic finish
  border: {
    default: "border border-chip-silver/20 dark:border-chip-silver/10",
    gold: "border-chip-gold/40 dark:border-chip-gold/30",
    copper: "border-chip-copper/40 dark:border-chip-copper/30",
    silver: "border-chip-silver/40 dark:border-chip-silver/30",
    focus: "focus:border-chip-gold focus:shadow-[0_0_0_2px_hsl(var(--chip-gold)/0.2)]",
    hover: "hover:border-chip-gold/60 hover:shadow-[0_2px_8px_hsl(var(--chip-dark)/0.3)]",
  },

  // Interactive states with sophisticated matte chip aesthetic
  interactive: {
    base: "relative transition-all duration-300 ease-out",
    hover: "hover:shadow-[inset_0_2px_0_rgba(255,184,77,0.2)] hover:shadow-[0_4px_12px_rgba(255,184,77,0.15)] hover:scale-[1.02] hover:border-chip-gold/30",
    active: "active:scale-[0.98] active:shadow-[inset_0_3px_0_rgba(255,184,77,0.4)] active:shadow-[0_2px_6px_rgba(255,184,77,0.2)]",
    selected: "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-chip-gold/20 data-[state=checked]:via-chip-gold/15 data-[state=checked]:to-chip-gold/25 data-[state=checked]:shadow-[inset_0_2px_0_rgba(255,184,77,0.4)] data-[state=checked]:text-chip-gold dark:data-[state=checked]:text-chip-gold data-[state=checked]:border-chip-gold/50",
    disabled: "disabled:opacity-40 disabled:cursor-not-allowed disabled:grayscale disabled:shadow-none",
    focus: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip-gold/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  },

  // Animation presets
  animation: {
    fadeIn:
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    slideIn: "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    slideFromTop: "data-[side=bottom]:slide-in-from-top-2",
    slideFromBottom: "data-[side=top]:slide-in-from-bottom-2",
    slideFromLeft: "data-[side=right]:slide-in-from-left-2",
    slideFromRight: "data-[side=left]:slide-in-from-right-2",
  },

  // Sophisticated 2025 shadow effects with multi-layer depth
  shadow: {
    sm: "shadow-[0_1px_3px_rgba(0,0,0,0.1)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.4)]",
    md: "shadow-[0_3px_6px_rgba(0,0,0,0.12)] dark:shadow-[0_3px_6px_rgba(0,0,0,0.5)]",
    lg: "shadow-[0_8px_16px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.6)]",
    elevated: "shadow-[0_12px_24px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_24px_rgba(0,0,0,0.7)]",
    // Multi-layer embossed depth effects
    depth: {
      gold: "shadow-[inset_0_2px_0_rgba(255,184,77,0.3),inset_0_-1px_0_rgba(0,0,0,0.1),0_4px_8px_rgba(255,184,77,0.2),0_8px_16px_rgba(0,0,0,0.1)]",
      copper: "shadow-[inset_0_2px_0_rgba(184,115,51,0.3),inset_0_-1px_0_rgba(0,0,0,0.1),0_4px_8px_rgba(184,115,51,0.2),0_8px_16px_rgba(0,0,0,0.1)]",
      silver: "shadow-[inset_0_2px_0_rgba(192,192,192,0.3),inset_0_-1px_0_rgba(0,0,0,0.1),0_4px_8px_rgba(192,192,192,0.2),0_8px_16px_rgba(0,0,0,0.1)]",
      default: "shadow-[inset_0_2px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_2px_0_rgba(255,184,77,0.2),inset_0_-1px_0_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.4)]",
      pressed: "shadow-[inset_0_3px_6px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_3px_6px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(0,0,0,0.5)]",
    },
  },

  // Priority colors (matching task system with chip aesthetic)
  priority: {
    critical: {
      background: "bg-red-100/80 dark:bg-red-900/30 border border-red-400/30",
      text: "text-red-700 dark:text-red-400",
      hover: "hover:bg-red-200/80 dark:hover:bg-red-900/40",
      shadow: "hover:shadow-[0_2px_8px_rgba(239,68,68,0.3)]",
    },
    high: {
      background: "bg-chip-gold/20 dark:bg-chip-gold/10 border border-chip-gold/30",
      text: "text-chip-copper dark:text-chip-gold",
      hover: "hover:bg-chip-gold/30 dark:hover:bg-chip-gold/15",
      shadow: "hover:shadow-[0_2px_8px_hsl(var(--chip-gold)/0.3)]",
    },
    medium: {
      background: "bg-chip-silver/20 dark:bg-chip-silver/10 border border-chip-silver/30",
      text: "text-gray-700 dark:text-chip-silver",
      hover: "hover:bg-chip-silver/30 dark:hover:bg-chip-silver/15",
      shadow: "hover:shadow-[0_2px_8px_hsl(var(--chip-silver)/0.3)]",
    },
    low: {
      background: "bg-gray-100/80 dark:bg-gray-800/30 border border-gray-300/30",
      text: "text-gray-600 dark:text-gray-400",
      hover: "hover:bg-gray-200/80 dark:hover:bg-gray-800/40",
      shadow: "hover:shadow-[0_2px_8px_rgba(107,114,128,0.3)]",
    },
  },

  // Circuit trace decorations
  circuit: {
    traceTop: "before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-chip-gold before:to-transparent",
    traceBottom: "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-chip-gold after:to-transparent",
    traceLeft: "before:absolute before:top-0 before:left-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-chip-copper before:to-transparent",
    traceRight: "after:absolute after:top-0 after:right-0 after:bottom-0 after:w-[2px] after:bg-gradient-to-b after:from-transparent after:via-chip-copper after:to-transparent",
    corner: "before:absolute before:top-2 before:left-2 before:w-2 before:h-2 before:border-t-2 before:border-l-2 before:border-chip-gold/40",
  },
};

// Sophisticated compound styles for 2025 matte embossed patterns
export const compoundStyles = {
  // Standard interactive element with embossed sophistication
  interactiveElement: `
    ${glassmorphism.interactive.base}
    ${glassmorphism.interactive.hover}
    ${glassmorphism.interactive.active}
    ${glassmorphism.interactive.focus}
    ${glassmorphism.interactive.disabled}
    ${glassmorphism.shadow.depth.default}
    ${glassmorphism.glow.subtle}
  `,

  // Premium floating panels with layered depth
  floatingPanel: `
    ${glassmorphism.background.strong}
    ${glassmorphism.border.default}
    ${glassmorphism.shadow.elevated}
    ${glassmorphism.animation.fadeIn}
    ${glassmorphism.animation.slideIn}
    ${glassmorphism.glow.moderate}
    backdrop-blur-md
  `,

  // Sophisticated form controls with matte finish
  formControl: `
    ${glassmorphism.background.subtle}
    ${glassmorphism.border.default}
    ${glassmorphism.border.hover}
    ${glassmorphism.border.focus}
    ${glassmorphism.interactive.base}
    ${glassmorphism.interactive.focus}
    ${glassmorphism.interactive.disabled}
    ${glassmorphism.shadow.depth.default}
  `,

  // Premium cards with multi-layer embossing
  card: `
    ${glassmorphism.background.card}
    ${glassmorphism.border.default}
    ${glassmorphism.shadow.lg}
    ${glassmorphism.glow.subtle}
    ${glassmorphism.circuit.traceTop}
    relative overflow-hidden
  `,

  // Industrial chip-style container with full sophistication
  chipContainer: `
    ${glassmorphism.background.card}
    ${glassmorphism.shadow.depth.default}
    ${glassmorphism.glow.moderate}
    ${glassmorphism.circuit.traceTop}
    ${glassmorphism.circuit.corner}
    relative overflow-hidden
  `,

  // Button variants with sophisticated embossing
  button: {
    primary: `
      ${glassmorphism.background.gold}
      ${glassmorphism.shadow.depth.gold}
      ${glassmorphism.glow.moderate}
      ${glassmorphism.interactive.base}
      ${glassmorphism.interactive.hover}
      ${glassmorphism.interactive.active}
      ${glassmorphism.interactive.focus}
      text-chip-copper dark:text-chip-gold font-medium
    `,
    secondary: `
      ${glassmorphism.background.subtle}
      ${glassmorphism.shadow.depth.default}
      ${glassmorphism.glow.subtle}
      ${glassmorphism.interactive.base}
      ${glassmorphism.interactive.hover}
      ${glassmorphism.interactive.active}
      ${glassmorphism.interactive.focus}
    `,
    ghost: `
      ${glassmorphism.interactive.base}
      ${glassmorphism.interactive.hover}
      ${glassmorphism.interactive.active}
      ${glassmorphism.interactive.focus}
      hover:${glassmorphism.background.subtle}
      hover:${glassmorphism.glow.subtle}
    `,
  },

  // Input field with premium matte finish  
  input: `
    ${glassmorphism.background.subtle}
    ${glassmorphism.shadow.depth.default}
    ${glassmorphism.border.default}
    ${glassmorphism.border.focus}
    ${glassmorphism.interactive.base}
    ${glassmorphism.interactive.focus}
    placeholder:text-gray-500 dark:placeholder:text-gray-400
  `,
};

// Utility function to combine classes
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}