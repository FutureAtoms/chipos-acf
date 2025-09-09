import { Bot, User } from "lucide-react";
import type { Assignee } from "../types";

// Drag and drop constants
export const ItemTypes = {
  TASK: "task",
};

// Get icon for assignee
export const getAssigneeIcon = (assigneeName: Assignee) => {
  switch (assigneeName) {
    case "User":
      return <User className="w-4 h-4 text-blue-400" />;
    case "AI IDE Agent":
      return <Bot className="w-4 h-4 text-purple-400" />;
    case "ChipOS":
      return (
        <div className="relative w-6 h-6">
          {/* Micro ambient glow */}
          <div className="absolute inset-0 rounded-md bg-gradient-to-br from-chip-gold/30 via-transparent to-chip-copper/15 blur-sm opacity-70 scale-110" />
          
          {/* Micro embossed container */}
          <div className="relative w-6 h-6 rounded-md bg-gradient-to-br from-gray-100/80 via-gray-50/60 to-gray-200/40 dark:from-chip-dark/90 dark:via-gray-900/70 dark:to-black/80 shadow-[inset_0_0.5px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_0.5px_0_rgba(255,184,77,0.2)] shadow-[0_2px_4px_rgba(0,0,0,0.15)] border border-gray-200/60 dark:border-chip-gold/20">
            <img 
              src="/logo-neon.png" 
              alt="ChipOS" 
              className="w-6 h-6 filter saturate-110 contrast-105 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] relative z-10" 
            />
          </div>
        </div>
      );
    default:
      return <User className="w-4 h-4 text-blue-400" />;
  }
};

// Get glow effect for assignee
export const getAssigneeGlow = (assigneeName: Assignee) => {
  switch (assigneeName) {
    case "User":
      return "shadow-[0_0_10px_rgba(255,184,77,0.4)]";
    case "AI IDE Agent":
      return "shadow-[0_0_10px_rgba(168,85,247,0.4)]";
    case "ChipOS":
      return "shadow-[0_0_10px_rgba(255,184,77,0.4)]";
    default:
      return "shadow-[0_0_10px_rgba(255,184,77,0.4)]";
  }
};

// Get color based on task priority/order
export const getOrderColor = (order: number) => {
  if (order <= 3) return "bg-rose-500";
  if (order <= 6) return "bg-orange-500";
  if (order <= 10) return "bg-blue-500";
  return "bg-emerald-500";
};

// Get glow effect based on task priority/order
export const getOrderGlow = (order: number) => {
  if (order <= 3) return "shadow-[0_0_10px_rgba(244,63,94,0.7)]";
  if (order <= 6) return "shadow-[0_0_10px_rgba(249,115,22,0.7)]";
  if (order <= 10) return "shadow-[0_0_10px_rgba(255,184,77,0.7)]";
  return "shadow-[0_0_10px_rgba(16,185,129,0.7)]";
};

// Get column header color based on status
export const getColumnColor = (status: "todo" | "doing" | "review" | "done") => {
  switch (status) {
    case "todo":
      return "text-gray-600 dark:text-gray-400";
    case "doing":
      return "text-blue-600 dark:text-blue-400";
    case "review":
      return "text-purple-600 dark:text-purple-400";
    case "done":
      return "text-green-600 dark:text-green-400";
  }
};

// Get column header glow based on status
export const getColumnGlow = (status: "todo" | "doing" | "review" | "done") => {
  switch (status) {
    case "todo":
      return "bg-gray-500/30";
    case "doing":
      return "bg-blue-500/30 shadow-[0_0_10px_2px_rgba(255,184,77,0.2)]";
    case "review":
      return "bg-purple-500/30 shadow-[0_0_10px_2px_rgba(168,85,247,0.2)]";
    case "done":
      return "bg-green-500/30 shadow-[0_0_10px_2px_rgba(16,185,129,0.2)]";
  }
};
