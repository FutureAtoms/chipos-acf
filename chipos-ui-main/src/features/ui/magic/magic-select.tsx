import { ComponentPropsWithoutRef, forwardRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MagicSelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface MagicSelectProps
  extends Omit<ComponentPropsWithoutRef<"button">, "onChange"> {
  options: MagicSelectOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  showBorderGlow?: boolean
}

export const MagicSelect = forwardRef<HTMLButtonElement, MagicSelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select an option",
      label,
      error,
      showBorderGlow = true,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const selectedOption = options.find((opt) => opt.value === value)

    const handleSelect = (optionValue: string) => {
      onChange(optionValue)
      setIsOpen(false)
    }

    return (
      <div className="relative w-full">
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
          <button
            ref={ref}
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border bg-black/40 px-4 py-2.5 text-left text-white backdrop-blur-sm transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
              "focus:border-[#00d9ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]/50",
              error
                ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50"
                : "border-[#00d9ff]/30",
              className
            )}
            {...props}
          >
            <span className={cn(!selectedOption && "text-gray-500")}>
              {selectedOption?.label || placeholder}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-[#00d9ff]" />
            </motion.div>
          </button>

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

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop to close on outside click */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />

              {/* Options */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-[#00d9ff]/30 bg-black/95 shadow-[0_0_30px_rgba(0,217,255,0.3)] backdrop-blur-md"
              >
                <div className="max-h-60 overflow-y-auto">
                  {options.map((option, index) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      disabled={option.disabled}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors",
                        option.disabled
                          ? "cursor-not-allowed text-gray-600"
                          : "text-white hover:bg-[#00d9ff]/10",
                        value === option.value && "bg-[#00d9ff]/20"
                      )}
                    >
                      <span>{option.label}</span>
                      {value === option.value && (
                        <Check className="h-4 w-4 text-[#00d9ff]" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

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

MagicSelect.displayName = "MagicSelect"