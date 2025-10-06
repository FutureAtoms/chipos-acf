import * as TabsPrimitive from "@radix-ui/react-tabs";
import React from "react";
import { cn } from "./styles";

// Root
export const Tabs = TabsPrimitive.Root;

// List - macOS Liquid Glass style
export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "relative inline-flex rounded-xl overflow-hidden",
      "bg-gradient-to-b from-white/[0.12] to-white/[0.06]",
      "backdrop-blur-2xl backdrop-saturate-150",
      "border border-white/10",
      "shadow-[0_4px_16px_0_rgba(0,0,0,0.25)]",
      "p-1",
      className,
    )}
    role="tablist"
    {...props}
  >
    {/* Top specular highlight */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-20" />
    {props.children}
  </TabsPrimitive.List>
));
TabsList.displayName = TabsPrimitive.List.displayName;

// Trigger
export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    color?: "blue" | "purple" | "pink" | "orange" | "cyan" | "green";
  }
>(({ className, color = "blue", ...props }, ref) => {
  const colorMap = {
    blue: {
      text: "data-[state=active]:text-blue-400",
      bg: "data-[state=active]:bg-blue-500/20",
      border: "data-[state=active]:border-blue-500/40",
      shadow: "data-[state=active]:shadow-[0_0_12px_0_rgba(59,130,246,0.3)]",
      hover: "hover:text-blue-400/70",
    },
    purple: {
      text: "data-[state=active]:text-purple-400",
      bg: "data-[state=active]:bg-purple-500/20",
      border: "data-[state=active]:border-purple-500/40",
      shadow: "data-[state=active]:shadow-[0_0_12px_0_rgba(168,85,247,0.3)]",
      hover: "hover:text-purple-400/70",
    },
    pink: {
      text: "data-[state=active]:text-pink-400",
      bg: "data-[state=active]:bg-pink-500/20",
      border: "data-[state=active]:border-pink-500/40",
      shadow: "data-[state=active]:shadow-[0_0_12px_0_rgba(236,72,153,0.3)]",
      hover: "hover:text-pink-400/70",
    },
    orange: {
      text: "data-[state=active]:text-orange-400",
      bg: "data-[state=active]:bg-orange-500/20",
      border: "data-[state=active]:border-orange-500/40",
      shadow: "data-[state=active]:shadow-[0_0_12px_0_rgba(249,115,22,0.3)]",
      hover: "hover:text-orange-400/70",
    },
    cyan: {
      text: "data-[state=active]:text-cyan-400",
      bg: "data-[state=active]:bg-cyan-500/20",
      border: "data-[state=active]:border-cyan-500/40",
      shadow: "data-[state=active]:shadow-[0_0_12px_0_rgba(6,182,212,0.3)]",
      hover: "hover:text-cyan-400/70",
    },
    green: {
      text: "data-[state=active]:text-emerald-400",
      bg: "data-[state=active]:bg-emerald-500/20",
      border: "data-[state=active]:border-emerald-500/40",
      shadow: "data-[state=active]:shadow-[0_0_12px_0_rgba(16,185,129,0.3)]",
      hover: "hover:text-emerald-400/70",
    },
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative px-8 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 z-10",
        "text-white/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "border border-transparent",
        colorMap[color].text,
        colorMap[color].bg,
        colorMap[color].border,
        colorMap[color].shadow,
        colorMap[color].hover,
        className,
      )}
      {...props}
    >
      {props.children}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// Content
export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
