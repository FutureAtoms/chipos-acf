import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../lib/utils";

export interface LiquidGlassCardProps extends ComponentPropsWithoutRef<"div"> {
  hover?: boolean;
  active?: boolean;
  glow?: boolean;
  glowColor?: string;
}

/**
 * macOS-inspired Liquid Glass card with frosted glass effect
 * Features specular highlights, backdrop blur, and subtle borders
 */
export function LiquidGlassCard({
  children,
  className,
  hover = true,
  active = false,
  glow = false,
  glowColor = "#FFD700",
  ...props
}: LiquidGlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-white/[0.08] to-white/[0.02]",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-white/10",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
        active && [
          "border-[#FFD700]/40",
          "shadow-[0_8px_32px_0_rgba(255,215,0,0.15)]",
        ],
        className,
      )}
      {...props}
    >
      {/* Specular highlight (top edge) */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-px",
          "bg-gradient-to-r from-transparent via-white/20 to-transparent",
        )}
      />

      {/* Inner glow effect for active state */}
      {active && (
        <div
          className="absolute inset-0 opacity-50 blur-xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${glowColor}22, transparent 70%)`,
          }}
        />
      )}

      {/* Optional outer glow */}
      {glow && (
        <div
          className="absolute -inset-[1px] opacity-20 blur-lg -z-10"
          style={{
            background: glowColor,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/**
 * macOS-style toolbar/header with frosted glass
 */
export function LiquidGlassToolbar({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-gradient-to-b from-white/[0.12] to-white/[0.06]",
        "backdrop-blur-2xl backdrop-saturate-150",
        "border border-white/10",
        "shadow-[0_4px_16px_0_rgba(0,0,0,0.25)]",
        className,
      )}
      {...props}
    >
      {/* Top specular highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * macOS-style button with glass morphism
 */
export function LiquidGlassButton({
  children,
  className,
  active = false,
  variant = "default",
  ...props
}: ComponentPropsWithoutRef<"button"> & {
  active?: boolean;
  variant?: "default" | "primary" | "danger";
}) {
  const variantStyles = {
    default: "from-white/[0.12] to-white/[0.06] hover:from-white/[0.16] hover:to-white/[0.08]",
    primary: "from-[#FFD700]/30 to-[#FF9900]/20 hover:from-[#FFD700]/40 hover:to-[#FF9900]/30 border-[#FFD700]/30",
    danger: "from-red-500/30 to-red-600/20 hover:from-red-500/40 hover:to-red-600/30 border-red-500/30",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "relative overflow-hidden rounded-lg px-4 py-2",
        "bg-gradient-to-b",
        variantStyles[variant],
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-white/10",
        "shadow-[0_2px_8px_0_rgba(0,0,0,0.2)]",
        "text-sm font-medium text-white/90",
        "transition-all duration-200",
        active && "border-[#FFD700]/50 shadow-[0_0_20px_0_rgba(255,215,0,0.3)]",
        className,
      )}
      {...props}
    >
      {/* Top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
