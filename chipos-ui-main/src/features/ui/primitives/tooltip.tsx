import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React from "react";
import { cn, glassmorphism, compoundStyles } from "./styles";

// Provider
export const TooltipProvider = TooltipPrimitive.Provider;

// Root
export const Tooltip = TooltipPrimitive.Root;

// Trigger
export const TooltipTrigger = TooltipPrimitive.Trigger;

// Content with sophisticated chip-themed matte embossed design
export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-lg px-4 py-2 text-sm font-medium",
        // Sophisticated matte embossed glassmorphism
        glassmorphism.background.strong,
        glassmorphism.border.gold,
        glassmorphism.shadow.depth.gold,
        glassmorphism.glow.moderate,
        "backdrop-blur-md",
        // Sophisticated chip-themed text styling
        "text-chip-copper dark:text-chip-gold",
        "drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_1px_2px_rgba(255,184,77,0.3)]",
        // Enhanced circuit trace decoration
        glassmorphism.circuit.traceTop,
        "before:rounded-t-lg",
        // Subtle inner gradient for depth
        "after:absolute after:inset-0 after:rounded-lg after:pointer-events-none",
        "after:bg-gradient-to-b after:from-chip-gold/8 after:via-transparent after:to-chip-copper/3",
        // Sophisticated animations with chip aesthetic
        glassmorphism.animation.fadeIn,
        glassmorphism.animation.slideIn,
        glassmorphism.animation.slideFromTop,
        glassmorphism.animation.slideFromBottom,
        glassmorphism.animation.slideFromLeft,
        glassmorphism.animation.slideFromRight,
        "data-[state=open]:scale-100 data-[state=closed]:scale-95",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Simple tooltip wrapper for common use case
export interface SimpleTooltipProps {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
}

export const SimpleTooltip: React.FC<SimpleTooltipProps> = ({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 200,
}) => {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} align={align}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
};
