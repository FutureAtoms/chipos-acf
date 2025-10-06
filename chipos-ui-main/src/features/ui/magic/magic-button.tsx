import { ComponentPropsWithoutRef, forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface MagicButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "shimmer" | "rainbow" | "glow" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  shimmerColor?: string
  glowColor?: string
}

export const MagicButton = forwardRef<HTMLButtonElement, MagicButtonProps>(
  (
    {
      children,
      className,
      variant = "shimmer",
      size = "md",
      shimmerColor = "#00d9ff",
      glowColor = "#00d9ff",
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    }

    const baseClasses = cn(
      "relative inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
      sizeClasses[size]
    )

    if (variant === "shimmer") {
      return (
        <motion.button
          ref={ref}
          className={cn(
            baseClasses,
            "overflow-hidden border border-[#00d9ff]/30 bg-black/60 text-white backdrop-blur-sm hover:border-[#00d9ff] hover:shadow-[0_0_20px_rgba(0,217,255,0.5)]",
            className
          )}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          disabled={disabled}
          {...props}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 -translate-x-full"
            animate={{
              translateX: ["100%", "-100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: `linear-gradient(90deg, transparent, ${shimmerColor}40, transparent)`,
            }}
          />
          <span className="relative z-10">{children}</span>
        </motion.button>
      )
    }

    if (variant === "rainbow") {
      return (
        <motion.button
          ref={ref}
          className={cn(
            baseClasses,
            "group relative overflow-hidden border-0 text-white",
            className
          )}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          disabled={disabled}
          {...props}
        >
          {/* Animated rainbow gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff] via-[#0066ff] to-[#00d9ff] bg-[length:200%_100%] animate-gradient" />

          {/* Inner dark background */}
          <div className="absolute inset-[2px] rounded-[6px] bg-black/80 transition-all duration-300 group-hover:bg-black/60" />

          <span className="relative z-10">{children}</span>
        </motion.button>
      )
    }

    if (variant === "glow") {
      return (
        <motion.button
          ref={ref}
          className={cn(
            baseClasses,
            "border-0 bg-gradient-to-r from-[#00d9ff] to-[#0066ff] text-white shadow-[0_0_20px_rgba(0,217,255,0.5)] hover:shadow-[0_0_30px_rgba(0,217,255,0.8)]",
            className
          )}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          disabled={disabled}
          {...props}
        >
          {children}
        </motion.button>
      )
    }

    if (variant === "outline") {
      return (
        <motion.button
          ref={ref}
          className={cn(
            baseClasses,
            "border border-[#00d9ff]/50 bg-transparent text-[#00d9ff] hover:border-[#00d9ff] hover:bg-[#00d9ff]/10",
            className
          )}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          disabled={disabled}
          {...props}
        >
          {children}
        </motion.button>
      )
    }

    if (variant === "ghost") {
      return (
        <motion.button
          ref={ref}
          className={cn(
            baseClasses,
            "border-0 bg-transparent text-gray-400 hover:bg-white/5 hover:text-white",
            className
          )}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          disabled={disabled}
          {...props}
        >
          {children}
        </motion.button>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseClasses, className)}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

MagicButton.displayName = "MagicButton"