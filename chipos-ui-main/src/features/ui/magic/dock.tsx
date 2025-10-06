import { ComponentPropsWithoutRef, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export interface DockProps extends ComponentPropsWithoutRef<"div"> {
  direction?: "horizontal" | "vertical"
  magnification?: number
  distance?: number
}

export function Dock({
  children,
  direction = "horizontal",
  magnification = 60,
  distance = 140,
  className,
  ...props
}: DockProps) {
  const mouseX = useMotionValue(Infinity)
  const mouseY = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e) => {
        mouseX.set(e.pageX)
        mouseY.set(e.pageY)
      }}
      onMouseLeave={() => {
        mouseX.set(Infinity)
        mouseY.set(Infinity)
      }}
      className={cn(
        "flex items-center gap-2 rounded-2xl border border-[#FFD700]/20 bg-black/60 p-2 backdrop-blur-sm shadow-[0_0_20px_rgba(255,215,0,0.15)]",
        direction === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      {...props}
    >
      {Array.isArray(children) &&
        children.map((child, i) => (
          <DockItem
            key={i}
            mouseX={mouseX}
            mouseY={mouseY}
            magnification={magnification}
            distance={distance}
            direction={direction}
          >
            {child}
          </DockItem>
        ))}
      {!Array.isArray(children) && (
        <DockItem
          mouseX={mouseX}
          mouseY={mouseY}
          magnification={magnification}
          distance={distance}
          direction={direction}
        >
          {children}
        </DockItem>
      )}
    </motion.div>
  )
}

interface DockItemProps {
  children: React.ReactNode
  mouseX: any
  mouseY: any
  magnification: number
  distance: number
  direction: "horizontal" | "vertical"
}

function DockItem({
  children,
  mouseX,
  mouseY,
  magnification,
  distance,
  direction,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const distanceFromMouse = useTransform(
    direction === "horizontal" ? mouseX : mouseY,
    (val) => {
      const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 }
      const center = direction === "horizontal"
        ? bounds.x + bounds.width / 2
        : bounds.y + bounds.height / 2
      return val - center
    }
  )

  const widthOrHeightSync = useTransform(
    distanceFromMouse,
    [-distance, 0, distance],
    [48, magnification, 48]
  )

  const widthOrHeight = useSpring(widthOrHeightSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={
        direction === "horizontal"
          ? { width: widthOrHeight, minHeight: 48 }
          : { minWidth: 48, height: widthOrHeight }
      }
      className="flex items-center justify-center"
    >
      {children}
    </motion.div>
  )
}

export interface DockIconProps extends ComponentPropsWithoutRef<"button"> {
  icon: React.ReactNode
  label?: string
  active?: boolean
}

export function DockIcon({
  icon,
  label,
  active,
  className,
  ...props
}: DockIconProps) {
  const [showLabel, setShowLabel] = useState(false)

  return (
    <div className="relative">
      <motion.button
        className={cn(
          "flex h-full w-full items-center justify-center rounded-lg transition-colors duration-200",
          active
            ? "bg-[#FFD700]/20 text-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.4)]"
            : "text-[#FFD700]/60 hover:bg-[#FFD700]/5 hover:text-[#FFD700]",
          className
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        {...props}
      >
        {icon}
      </motion.button>

      {label && showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[#FFD700]/20 bg-black/90 px-3 py-1 text-xs text-[#FFD700] backdrop-blur-sm shadow-[0_0_10px_rgba(255,215,0,0.2)]"
        >
          {label}
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-[#FFD700]/20 bg-black/90" />
        </motion.div>
      )}
    </div>
  )
}