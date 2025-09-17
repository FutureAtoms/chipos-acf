import React from "react";
import { cn, glassmorphism, compoundStyles } from "./styles";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "ghost" | "link" | "gold" | "cyan" | "yellow";
  size?: "default" | "sm" | "lg" | "icon" | "xs";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = cn(
      "relative inline-flex items-center justify-center font-mono font-medium overflow-hidden",
      "focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 focus:ring-offset-2 focus:ring-offset-cyber-black",
      "disabled:pointer-events-none disabled:opacity-40 disabled:grayscale disabled:shadow-none",
      loading && "cursor-wait",
    );

    const variants = {
      default: cn(
        // Cyberpunk primary button with neon cyan glow
        "cyber-button",
        "bg-gradient-to-r from-cyber-dark/90 via-cyber-black/80 to-cyber-dark/90",
        "text-cyber-cyan font-semibold uppercase tracking-wider text-xs",
        "border border-cyber-cyan/50",
        "shadow-neon-cyan",
        "hover:shadow-neon-cyan hover:bg-cyber-cyan/10",
        "hover:scale-[1.02] hover:border-cyber-cyan",
        "active:scale-[0.98]",
        "transition-all duration-300",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-cyber-cyan/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500",
      ),
      destructive: cn(
        // Cyberpunk destructive button with red neon
        "cyber-button",
        "bg-cyber-black/80",
        "text-cyber-red font-semibold uppercase tracking-wider text-xs",
        "border border-cyber-red/50",
        "shadow-[0_0_5px_hsl(var(--cyber-red)),0_0_10px_hsl(var(--cyber-red)),0_0_20px_hsl(var(--cyber-red)/0.3)]",
        "hover:shadow-[0_0_10px_hsl(var(--cyber-red)),0_0_20px_hsl(var(--cyber-red)),0_0_30px_hsl(var(--cyber-red)/0.5)]",
        "hover:bg-cyber-red/10 hover:border-cyber-red",
        "hover:scale-[1.02]",
        "active:scale-[0.98]",
        "transition-all duration-300",
      ),
      outline: cn(
        // Cyberpunk outline button with magenta accents
        "bg-cyber-darker/50 backdrop-blur-sm",
        "text-cyber-magenta font-medium uppercase tracking-wide text-xs",
        "border border-cyber-magenta/40",
        "hover:border-cyber-magenta/70 hover:bg-cyber-magenta/5",
        "hover:shadow-[0_0_8px_hsl(var(--cyber-magenta)/0.4)]",
        "hover:scale-[1.01]",
        "active:scale-[0.99]",
        "transition-all duration-300",
      ),
      ghost: cn(
        // Cyberpunk ghost button with subtle glow
        "text-cyber-cyan/70 font-medium uppercase tracking-wide text-xs",
        "hover:text-cyber-cyan hover:bg-cyber-dark/30",
        "hover:shadow-[0_0_6px_hsl(var(--cyber-cyan)/0.3)]",
        "hover:scale-[1.01]",
        "active:scale-[0.99]",
        "transition-all duration-300",
        "border border-transparent hover:border-cyber-cyan/30",
      ),
      link: cn(
        // Cyberpunk link with holographic effect
        "text-cyber-cyan font-medium uppercase tracking-wide",
        "underline-offset-4 hover:underline",
        "hover:text-shadow-neon-cyan",
        "transition-all duration-200",
        "relative overflow-hidden",
        "hover:animate-glitch",
      ),
      gold: cn(
        // Cyberpunk premium yellow variant
        "cyber-button",
        "bg-gradient-to-r from-cyber-dark/90 via-cyber-black/80 to-cyber-dark/90",
        "text-cyber-yellow font-bold uppercase tracking-wider text-xs",
        "border border-cyber-yellow/60",
        "shadow-neon-yellow",
        "hover:shadow-[0_0_15px_hsl(var(--cyber-yellow)),0_0_25px_hsl(var(--cyber-yellow)),0_0_35px_hsl(var(--cyber-yellow)/0.4)]",
        "hover:bg-cyber-yellow/10 hover:border-cyber-yellow",
        "hover:scale-[1.02]",
        "active:scale-[0.98]",
        "transition-all duration-300",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-cyber-yellow/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500",
      ),
      cyan: cn(
        // Cyberpunk cyan variant for consistency
        "cyber-button",
        "bg-gradient-to-r from-cyber-dark/90 via-cyber-black/80 to-cyber-dark/90",
        "text-cyber-cyan font-semibold uppercase tracking-wider text-xs",
        "border border-cyber-cyan/50",
        "shadow-neon-cyan",
        "hover:shadow-neon-cyan hover:bg-cyber-cyan/10",
        "hover:scale-[1.02] hover:border-cyber-cyan",
        "active:scale-[0.98]",
        "transition-all duration-300",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-cyber-cyan/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500",
      ),
      yellow: cn(
        // Alias for gold variant
        "cyber-button",
        "bg-gradient-to-r from-cyber-dark/90 via-cyber-black/80 to-cyber-dark/90",
        "text-cyber-yellow font-bold uppercase tracking-wider text-xs",
        "border border-cyber-yellow/60",
        "shadow-neon-yellow",
        "hover:shadow-[0_0_15px_hsl(var(--cyber-yellow)),0_0_25px_hsl(var(--cyber-yellow)),0_0_35px_hsl(var(--cyber-yellow)/0.4)]",
        "hover:bg-cyber-yellow/10 hover:border-cyber-yellow",
        "hover:scale-[1.02]",
        "active:scale-[0.98]",
        "transition-all duration-300",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-cyber-yellow/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500",
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
            {/* Outer cyber ring */}
            <div className="absolute inset-0 animate-spin">
              <svg
                className="h-full w-full drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]"
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
                  strokeWidth="2" 
                />
                <path
                  className="opacity-90 drop-shadow-[0_0_4px_rgba(0,255,255,1)]"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            {/* Inner cyberpunk core with glitch effect */}
            <div className="absolute inset-[6px] bg-gradient-to-br from-cyber-cyan/40 to-cyber-magenta/20 animate-cyber-pulse border border-cyber-cyan/60" 
                 style={{clipPath: 'polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 15% 100%, 0% 85%)'}} />
            {/* Center pixel */}
            <div className="absolute inset-[9px] bg-cyber-cyan animate-pulse opacity-80" />
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
