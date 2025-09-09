import React from "react";
import { cn, glassmorphism, compoundStyles } from "./styles";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "ghost" | "link" | "gold";
  size?: "default" | "sm" | "lg" | "icon" | "xs";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = cn(
      "relative inline-flex items-center justify-center rounded-lg font-medium overflow-hidden",
      glassmorphism.interactive.base,
      glassmorphism.interactive.focus,
      "disabled:pointer-events-none disabled:opacity-40 disabled:grayscale disabled:shadow-none",
      loading && "cursor-wait",
    );

    const variants = {
      default: cn(
        // Primary sophisticated embossed button
        "bg-gradient-to-br from-chip-gold/20 via-chip-gold/15 to-chip-gold/25 dark:from-chip-gold/30 dark:via-chip-gold/20 dark:to-chip-gold/35",
        "text-chip-copper dark:text-chip-gold font-semibold",
        "border border-chip-gold/40 dark:border-chip-gold/35",
        glassmorphism.shadow.depth.gold,
        glassmorphism.glow.moderate,
        "hover:shadow-[inset_0_3px_0_rgba(255,184,77,0.4),0_6px_12px_rgba(255,184,77,0.3),0_12px_24px_rgba(0,0,0,0.1)]",
        "hover:scale-[1.02] hover:border-chip-gold/50",
        "active:scale-[0.98]",
        glassmorphism.shadow.depth.pressed.replace("active:", "active:"),
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-chip-gold/10 before:via-transparent before:to-chip-copper/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:-z-10",
      ),
      destructive: cn(
        // Sophisticated destructive button with red chip aesthetic
        "bg-gradient-to-br from-red-500/20 via-red-600/15 to-red-700/25 dark:from-red-600/30 dark:via-red-700/20 dark:to-red-800/35",
        "text-red-800 dark:text-red-300 font-semibold",
        "border border-red-600/40 dark:border-red-500/35",
        "shadow-[inset_0_2px_0_rgba(239,68,68,0.3),inset_0_-1px_0_rgba(0,0,0,0.1),0_4px_8px_rgba(239,68,68,0.2),0_8px_16px_rgba(0,0,0,0.1)]",
        "hover:shadow-[inset_0_3px_0_rgba(239,68,68,0.4),0_6px_12px_rgba(239,68,68,0.3),0_12px_24px_rgba(0,0,0,0.1)]",
        "hover:scale-[1.02] hover:border-red-500/50",
        "active:scale-[0.98]",
        glassmorphism.shadow.depth.pressed.replace("active:", "active:"),
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-red-500/10 before:via-transparent before:to-red-700/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:-z-10",
      ),
      outline: cn(
        // Sophisticated outlined button with matte finish
        glassmorphism.background.subtle,
        "text-gray-700 dark:text-chip-gold font-medium",
        glassmorphism.shadow.depth.default,
        glassmorphism.glow.subtle,
        "hover:scale-[1.01]",
        "hover:shadow-[inset_0_2px_0_rgba(255,184,77,0.2),0_4px_8px_rgba(255,184,77,0.15),0_8px_16px_rgba(0,0,0,0.1)]",
        "hover:border-chip-gold/40",
        "active:scale-[0.99]",
        glassmorphism.shadow.depth.pressed.replace("active:", "active:"),
      ),
      ghost: cn(
        // Sophisticated ghost button with hover embossing
        "text-gray-700 dark:text-chip-gold font-medium",
        glassmorphism.interactive.base,
        "hover:bg-gradient-to-br hover:from-gray-100/70 hover:via-gray-50/50 hover:to-gray-200/40",
        "dark:hover:from-chip-dark/70 dark:hover:via-gray-900/50 dark:hover:to-black/60",
        "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] dark:hover:shadow-[inset_0_1px_0_rgba(255,184,77,0.15)]",
        "hover:border hover:border-gray-200/50 dark:hover:border-chip-silver/20",
        "hover:scale-[1.01]",
        "active:scale-[0.99]",
        glassmorphism.glow.subtle.replace("before:", "hover:before:"),
      ),
      link: cn(
        // Sophisticated link button with subtle embossing
        "text-chip-copper dark:text-chip-gold font-medium",
        "underline-offset-4 hover:underline",
        "hover:text-chip-gold dark:hover:text-chip-gold/80",
        "hover:drop-shadow-[0_2px_4px_rgba(255,184,77,0.3)]",
        "transition-all duration-200",
      ),
      gold: cn(
        // Premium gold variant with full sophistication
        glassmorphism.background.gold,
        glassmorphism.shadow.depth.gold,
        glassmorphism.glow.intense,
        "text-chip-copper dark:text-chip-gold font-semibold",
        "hover:scale-[1.02]",
        "hover:shadow-[inset_0_3px_0_rgba(255,184,77,0.5),0_8px_16px_rgba(255,184,77,0.4),0_16px_32px_rgba(0,0,0,0.1)]",
        "active:scale-[0.98]",
        glassmorphism.shadow.depth.pressed.replace("active:", "active:"),
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-chip-gold/15 before:via-transparent before:to-chip-copper/10 before:opacity-60 hover:before:opacity-100 before:transition-opacity before:duration-300 before:-z-10",
      ),
    };

    const sizes = {
      default: "h-11 px-6 py-3 text-sm",
      sm: "h-9 px-4 py-2 text-xs",
      lg: "h-13 px-8 py-4 text-base",
      icon: "h-11 w-11 p-0",
      xs: "h-8 px-3 py-1 text-xs",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="relative mr-3 h-4 w-4">
            {/* Outer glow ring */}
            <div className="absolute inset-0 animate-spin">
              <svg
                className="h-full w-full drop-shadow-[0_0_4px_rgba(255,184,77,0.6)]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-label="Loading"
                role="img"
              >
                <circle 
                  className="opacity-20" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                />
                <path
                  className="opacity-90 drop-shadow-[0_0_2px_rgba(255,184,77,0.8)]"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            {/* Inner chip-style core */}
            <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-chip-gold/30 to-chip-copper/20 animate-pulse border border-chip-gold/40" />
          </div>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export interface IconButtonProps extends Omit<ButtonProps, "size" | "children"> {
  icon: React.ReactNode;
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({ icon, className, ...props }, ref) => {
  return (
    <Button ref={ref} size="icon" className={cn("relative", className)} {...props}>
      {icon}
    </Button>
  );
});

IconButton.displayName = "IconButton";
