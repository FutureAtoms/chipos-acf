import { ComponentPropsWithoutRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { MagicButton } from "./magic-button"

export interface MagicModalProps extends ComponentPropsWithoutRef<"div"> {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-7xl",
}

export function MagicModal({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  children,
  className,
  ...props
}: MagicModalProps) {
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className={cn(
              "relative z-10 w-full overflow-hidden rounded-xl border border-[#00d9ff]/30 bg-black/90 shadow-[0_0_50px_rgba(0,217,255,0.3)] backdrop-blur-md",
              sizeClasses[size],
              className
            )}
            {...props}
          >
            {/* Animated border glow */}
            <div className="pointer-events-none absolute inset-0 rounded-xl">
              <motion.div
                className="absolute h-20 w-20 rounded-full blur-xl"
                style={{
                  background: "linear-gradient(90deg, #00d9ff, #0066ff)",
                }}
                animate={{
                  x: [0, "100%", "100%", 0, 0],
                  y: [0, 0, "100%", "100%", 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* Header */}
            {(title || showCloseButton) && (
              <div className="relative z-10 flex items-start justify-between border-b border-[#00d9ff]/20 p-6">
                <div className="flex-1">
                  {title && (
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                  )}
                  {description && (
                    <p className="mt-1 text-sm text-gray-400">{description}</p>
                  )}
                </div>
                {showCloseButton && (
                  <MagicButton
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="ml-4 shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </MagicButton>
                )}
              </div>
            )}

            {/* Content */}
            <div className="relative z-10 max-h-[calc(100vh-200px)] overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export interface MagicModalFooterProps
  extends ComponentPropsWithoutRef<"div"> {}

export function MagicModalFooter({
  children,
  className,
  ...props
}: MagicModalFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 border-t border-[#00d9ff]/20 bg-black/40 p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}