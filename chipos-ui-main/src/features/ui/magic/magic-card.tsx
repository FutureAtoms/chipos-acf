import { useRef, useState, MouseEvent, ComponentPropsWithoutRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export interface MagicCardProps extends ComponentPropsWithoutRef<"div"> {
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
  borderColor?: string
  showBorderBeam?: boolean
  beamDuration?: number
  beamDelay?: number
}

export function MagicCard({
  children,
  className,
  gradientSize = 300,
  gradientColor = "#FFD700",
  gradientOpacity = 0.3,
  borderColor = "rgba(255, 215, 0, 0.2)",
  showBorderBeam = true,
  beamDuration = 15,
  beamDelay = 0,
  ...props
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const [isHovered, setIsHovered] = useState(false)

  const springConfig = { damping: 25, stiffness: 300 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const maskImage = useTransform(
    [x, y],
    ([latestX, latestY]) => {
      return `radial-gradient(${gradientSize}px circle at ${latestX}px ${latestY}px, black, transparent 80%)`
    }
  )

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-black/40 backdrop-blur-sm transition-all duration-300",
        "hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]",
        className
      )}
      style={{ borderColor }}
      {...props}
    >
      {/* Gradient overlay on hover */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            maskImage,
            WebkitMaskImage: maskImage,
            backgroundColor: gradientColor,
            opacity: gradientOpacity,
          }}
        />
      )}

      {/* Border beam animation */}
      {showBorderBeam && (
        <div className="pointer-events-none absolute inset-0 rounded-[inherit]">
          <motion.div
            className="absolute h-20 w-20 rounded-full blur-xl opacity-50"
            style={{
              background: `radial-gradient(circle, ${gradientColor} 0%, transparent 70%)`,
            }}
            animate={{
              x: [0, "100%", "100%", 0, 0],
              y: [0, 0, "100%", "100%", 0],
            }}
            transition={{
              duration: beamDuration,
              repeat: Infinity,
              ease: "linear",
              delay: beamDelay,
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}