import { ComponentPropsWithoutRef, forwardRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface MagicInputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string
  error?: string
  icon?: React.ReactNode
  showBorderGlow?: boolean
}

export const MagicInput = forwardRef<HTMLInputElement, MagicInputProps>(
  ({ className, label, error, icon, showBorderGlow = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00d9ff]">
              {icon}
            </div>
          )}
          <motion.div
            className={cn(
              "relative overflow-hidden rounded-lg",
              showBorderGlow && "transition-shadow duration-300"
            )}
            animate={{
              boxShadow: isFocused
                ? "0 0 20px rgba(0, 217, 255, 0.3)"
                : "0 0 0px rgba(0, 217, 255, 0)",
            }}
          >
            <input
              ref={ref}
              className={cn(
                "w-full rounded-lg border bg-black/40 px-4 py-2.5 text-white backdrop-blur-sm transition-all duration-300 placeholder:text-gray-500",
                "focus:border-[#00d9ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]/50",
                icon && "pl-10",
                error
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50"
                  : "border-[#00d9ff]/30",
                className
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />

            {/* Animated border glow */}
            {showBorderGlow && isFocused && (
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 rounded-lg border-2 border-[#00d9ff]/50" />
              </motion.div>
            )}
          </motion.div>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-400"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

MagicInput.displayName = "MagicInput"

export interface MagicTextareaProps
  extends ComponentPropsWithoutRef<"textarea"> {
  label?: string
  error?: string
  showBorderGlow?: boolean
}

export const MagicTextarea = forwardRef<
  HTMLTextAreaElement,
  MagicTextareaProps
>(({ className, label, error, showBorderGlow = true, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-lg",
          showBorderGlow && "transition-shadow duration-300"
        )}
        animate={{
          boxShadow: isFocused
            ? "0 0 20px rgba(0, 217, 255, 0.3)"
            : "0 0 0px rgba(0, 217, 255, 0)",
        }}
      >
        <textarea
          ref={ref}
          className={cn(
            "w-full rounded-lg border bg-black/40 px-4 py-2.5 text-white backdrop-blur-sm transition-all duration-300 placeholder:text-gray-500",
            "focus:border-[#00d9ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]/50",
            error
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50"
              : "border-[#00d9ff]/30",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {showBorderGlow && isFocused && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 rounded-lg border-2 border-[#00d9ff]/50" />
          </motion.div>
        )}
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
})

MagicTextarea.displayName = "MagicTextarea"