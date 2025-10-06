import { ComponentPropsWithoutRef, forwardRef } from "react"
import { motion } from "framer-motion"
import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MagicCheckboxProps
  extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  label?: string
  indeterminate?: boolean
  variant?: "default" | "glow"
}

export const MagicCheckbox = forwardRef<HTMLInputElement, MagicCheckboxProps>(
  (
    {
      label,
      indeterminate = false,
      variant = "default",
      checked,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isChecked = checked || indeterminate

    return (
      <label
        className={cn(
          "flex items-center gap-3 cursor-pointer",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />

          <motion.div
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded border-2 transition-all duration-200",
              isChecked
                ? variant === "glow"
                  ? "border-[#00d9ff] bg-[#00d9ff] shadow-[0_0_15px_rgba(0,217,255,0.5)]"
                  : "border-[#00d9ff] bg-[#00d9ff]"
                : "border-gray-700 bg-gray-800",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-[#00d9ff] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black"
            )}
            whileTap={{ scale: disabled ? 1 : 0.9 }}
          >
            <AnimatePresence mode="wait">
              {indeterminate ? (
                <motion.div
                  key="indeterminate"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Minus className="h-3 w-3 text-black" strokeWidth={3} />
                </motion.div>
              ) : (
                checked && (
                  <motion.div
                    key="checked"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Check className="h-3 w-3 text-black" strokeWidth={3} />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>

          {variant === "glow" && isChecked && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background:
                  "radial-gradient(circle, rgba(0,217,255,0.3) 0%, transparent 70%)",
              }}
            />
          )}
        </div>

        {label && (
          <span className="select-none text-sm font-medium text-gray-300">
            {label}
          </span>
        )}
      </label>
    )
  }
)

MagicCheckbox.displayName = "MagicCheckbox"