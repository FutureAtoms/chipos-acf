import { ComponentPropsWithoutRef, forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface AnimatedToggleProps
  extends Omit<ComponentPropsWithoutRef<"button">, "onChange"> {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "glow"
}

export const AnimatedToggle = forwardRef<HTMLButtonElement, AnimatedToggleProps>(
  (
    {
      checked,
      onChange,
      label,
      size = "md",
      variant = "default",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: { container: "h-5 w-9", thumb: "h-4 w-4" },
      md: { container: "h-6 w-11", thumb: "h-5 w-5" },
      lg: { container: "h-7 w-14", thumb: "h-6 w-6" },
    }

    const handleClick = () => {
      if (!disabled) {
        onChange(!checked)
      }
    }

    return (
      <div className="flex items-center gap-3">
        <motion.button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={handleClick}
          className={cn(
            "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d9ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50",
            sizes[size].container,
            checked
              ? variant === "glow"
                ? "border-[#00d9ff] bg-[#00d9ff] shadow-[0_0_20px_rgba(0,217,255,0.5)]"
                : "border-[#00d9ff] bg-[#00d9ff]"
              : "border-gray-700 bg-gray-800",
            className
          )}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          disabled={disabled}
          {...props}
        >
          <motion.span
            className={cn(
              "pointer-events-none block rounded-full bg-white shadow-lg ring-0",
              sizes[size].thumb
            )}
            layout
            initial={false}
            animate={{
              x: checked
                ? size === "sm"
                  ? 16
                  : size === "md"
                  ? 20
                  : 28
                : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />

          {variant === "glow" && checked && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background:
                  "radial-gradient(circle, rgba(0,217,255,0.3) 0%, transparent 70%)",
              }}
            />
          )}
        </motion.button>

        {label && (
          <label
            className={cn(
              "text-sm font-medium text-gray-300",
              disabled && "opacity-50"
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

AnimatedToggle.displayName = "AnimatedToggle"