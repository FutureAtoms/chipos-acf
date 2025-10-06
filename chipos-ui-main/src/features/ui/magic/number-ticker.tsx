import { useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { cn } from "@/lib/utils"

export interface NumberTickerProps {
  value: number
  direction?: "up" | "down"
  delay?: number
  className?: string
  decimalPlaces?: number
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : 0)
  const rounded = useTransform(motionValue, (latest) =>
    latest.toFixed(decimalPlaces)
  )

  useEffect(() => {
    const animation = animate(motionValue, value, {
      duration: 2,
      delay,
      ease: "easeOut",
    })

    return animation.stop
  }, [motionValue, value, delay])

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {rounded}
    </motion.span>
  )
}

export interface AnimatedCounterProps {
  value: number
  className?: string
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({
  value,
  className,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    const animation = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
    })

    return () => animation.stop()
  }, [count, value])

  return (
    <motion.span className={cn("font-bold", className)}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  )
}