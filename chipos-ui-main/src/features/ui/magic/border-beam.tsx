"use client"

import { motion, Transition } from "framer-motion"
import { cn } from "@/lib/utils"

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  transition?: Transition
  className?: string
  style?: React.CSSProperties
  reverse?: boolean
  initialOffset?: number
  borderWidth?: number
}

export const BorderBeam = ({
  className,
  size = 200,
  delay = 0,
  duration = 15,
  colorFrom = "#00d9ff",
  colorTo = "#0066ff",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1.5,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--border-beam-size": `${size}px`,
          "--border-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
      className="pointer-events-none absolute inset-0 rounded-[inherit] [border:var(--border-width)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]"
    >
      <motion.div
        style={
          {
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "absolute aspect-square w-[var(--border-beam-size)]",
          "rounded-full",
          "bg-gradient-to-l",
          `from-[${colorFrom}] to-[${colorTo}]`,
          "![offset-anchor:center] ![offset-path:rect(0_auto_auto_0_round_var(--border-beam-size))]",
          className
        )}
        animate={{
          offsetDistance: reverse ? ["100%", "0%"] : ["0%", "100%"],
        }}
        transition={
          transition ?? {
            duration,
            ease: "linear",
            repeat: Infinity,
            delay,
          }
        }
      />
    </div>
  )
}