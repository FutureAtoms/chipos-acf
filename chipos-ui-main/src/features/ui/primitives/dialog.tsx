import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";
import { cn, glassmorphism, compoundStyles } from "./styles";

// Dialog Root and Trigger
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

// Dialog Overlay with sophisticated chip-themed backdrop
export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50",
      // Sophisticated backdrop with chip-inspired depth
      "backdrop-blur-md bg-gradient-to-br from-black/60 via-chip-dark/40 to-black/70",
      "dark:bg-gradient-to-br dark:from-black/80 dark:via-chip-dark/60 dark:to-black/90",
      // Enhanced animation with chip aesthetic
      glassmorphism.animation.fadeIn,
      "data-[state=open]:backdrop-blur-lg",
      // Subtle ambient glow effect
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-chip-gold/5 before:via-transparent before:to-chip-copper/3 before:animate-pulse before:duration-3000",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// Dialog Content with sophisticated chip-themed matte embossed design
export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
  }
>(({ className, children, showCloseButton = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        "p-8 rounded-xl backdrop-blur-lg",
        "w-full max-w-2xl",
        // Sophisticated matte embossed glassmorphism
        compoundStyles.floatingPanel,
        glassmorphism.glow.moderate,
        glassmorphism.shadow.elevated,
        // Enhanced animations with chip aesthetic
        glassmorphism.animation.slideIn,
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        // Sophisticated circuit trace decoration
        glassmorphism.circuit.traceTop,
        // Enhanced gradient overlay for depth
        "after:absolute after:top-0 after:left-0 after:right-0 after:h-20",
        "after:bg-gradient-to-b after:from-chip-gold/8 after:via-chip-gold/3 after:to-transparent",
        "after:rounded-t-xl after:pointer-events-none",
        className,
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      {showCloseButton && (
        <DialogPrimitive.Close
          className={cn(
            "absolute right-6 top-6 z-20",
            "p-2 rounded-lg",
            "text-gray-600 dark:text-chip-silver",
            glassmorphism.interactive.base,
            "hover:bg-gray-100/80 dark:hover:bg-chip-dark/60",
            "hover:text-chip-copper dark:hover:text-chip-gold",
            "hover:scale-110",
            glassmorphism.shadow.sm,
          )}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Dialog Header
export const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 text-center sm:text-left", "mb-4", className)} {...props} />
  ),
);
DialogHeader.displayName = "DialogHeader";

// Dialog Footer
export const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", "mt-6", className)}
      {...props}
    />
  ),
);
DialogFooter.displayName = "DialogFooter";

// Dialog Title with sophisticated chip-themed gradient
export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-2xl font-bold tracking-wide",
      // Sophisticated chip-themed gradient text
      "bg-gradient-to-r from-chip-copper via-chip-gold to-chip-copper",
      "dark:from-chip-gold dark:via-chip-gold/80 dark:to-chip-copper",
      "text-transparent bg-clip-text",
      // Enhanced text effects
      "drop-shadow-[0_2px_4px_rgba(255,184,77,0.3)]",
      "dark:drop-shadow-[0_2px_4px_rgba(255,184,77,0.5)]",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Dialog Description with sophisticated chip-themed styling  
export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm font-medium leading-relaxed",
      "text-gray-700 dark:text-chip-silver/90",
      // Subtle embossed text effect
      "drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_2px_rgba(255,184,77,0.1)]",
      className
    )}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
