import { ComponentPropsWithoutRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface AnimatedBadgeProps extends ComponentPropsWithoutRef<"div"> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "shimmer"
  size?: "sm" | "md" | "lg"
  pulse?: boolean
  glow?: boolean
}

export function AnimatedBadge({
  children,
  variant = "default",
  size = "md",
  pulse = false,
  glow = false,
  className,
  ...props
}: AnimatedBadgeProps) {
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  }

  const variants = {
    default: {
      bg: "bg-[#00d9ff]/10",
      text: "text-[#00d9ff]",
      border: "border-[#00d9ff]/30",
      glow: "shadow-[0_0_15px_rgba(0,217,255,0.3)]",
    },
    success: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      border: "border-green-500/30",
      glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
    },
    warning: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      border: "border-yellow-500/30",
      glow: "shadow-[0_0_15px_rgba(234,179,8,0.3)]",
    },
    error: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/30",
      glow: "shadow-[0_0_15px_rgba(239,68,68,0.3)]",
    },
    info: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/30",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    },
    shimmer: {
      bg: "bg-gradient-to-r from-[#00d9ff]/10 via-[#0066ff]/10 to-[#00d9ff]/10 bg-[length:200%_100%]",
      text: "text-[#00d9ff]",
      border: "border-[#00d9ff]/30",
      glow: "shadow-[0_0_15px_rgba(0,217,255,0.3)]",
    },
  }

  const style = variants[variant]

  if (variant === "shimmer") {
    return (
      <motion.div
        className={cn(
          "relative inline-flex items-center gap-1 rounded-full border font-medium backdrop-blur-sm",
          sizes[size],
          style.bg,
          style.text,
          style.border,
          glow && style.glow,
          "overflow-hidden",
          className
        )}
        animate={
          pulse
            ? {
                scale: [1, 1.05, 1],
              }
            : undefined
        }
        transition={
          pulse
            ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined
        }
        {...props}
      >
        {/* Animated shimmer effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "200% 0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,217,255,0.3), transparent)",
            backgroundSize: "200% 100%",
          }}
        />
        <span className="relative z-10">{children}</span>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium backdrop-blur-sm",
        sizes[size],
        style.bg,
        style.text,
        style.border,
        glow && style.glow,
        className
      )}
      animate={
        pulse
          ? {
              scale: [1, 1.05, 1],
            }
          : undefined
      }
      transition={
        pulse
          ? {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StatusBadge({
  status,
  className,
  ...props
}: Omit<AnimatedBadgeProps, "variant"> & {
  status: "active" | "inactive" | "pending" | "error" | "success"
}) {
  const statusMap = {
    active: { variant: "success" as const, label: "Active", pulse: true },
    inactive: { variant: "default" as const, label: "Inactive" },
    pending: { variant: "warning" as const, label: "Pending", pulse: true },
    error: { variant: "error" as const, label: "Error" },
    success: { variant: "success" as const, label: "Success" },
  }

  const config = statusMap[status]

  return (
    <AnimatedBadge
      variant={config.variant}
      pulse={config.pulse}
      glow={config.pulse}
      className={className}
      {...props}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          config.variant === "success" && "bg-green-400",
          config.variant === "warning" && "bg-yellow-400",
          config.variant === "error" && "bg-red-400",
          config.variant === "default" && "bg-gray-400"
        )}
      />
      {config.label}
    </AnimatedBadge>
  )
}