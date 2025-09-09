import React from 'react';
import { glassmorphism, compoundStyles } from '../../features/ui/primitives/styles';
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  accentColor?: 'gold' | 'copper' | 'silver' | 'red' | 'dark' | 'none' | 'purple' | 'green' | 'pink' | 'blue' | 'orange' | 'gray' | 'cyan';
  variant?: 'default' | 'bordered' | 'chip';
}
export const Card: React.FC<CardProps> = ({
  children,
  accentColor = 'none',
  variant = 'default',
  className = '',
  ...props
}) => {
  // Map legacy colors to new chip-themed colors
  const colorMapping: Record<string, string> = {
    'purple': 'gold',
    'green': 'copper',
    'pink': 'copper',
    'blue': 'silver',
    'orange': 'gold',
    'gray': 'dark',
    'cyan': 'silver',
  };
  
  // Use mapped color or original if it's already in the new set
  const mappedColor = colorMapping[accentColor] || accentColor;
  
  const accentColorMap = {
    gold: {
      trace: glassmorphism.circuit.traceTop,
      border: 'border-chip-gold/40 dark:border-chip-gold/30',
      shadow: glassmorphism.shadow.depth.gold,
      glow: glassmorphism.glow.moderate,
      background: glassmorphism.background.gold,
      gradientOverlay: 'after:bg-gradient-to-br after:from-chip-gold/10 after:via-transparent after:to-chip-copper/5 after:opacity-60',
    },
    copper: {
      trace: glassmorphism.circuit.traceTop.replace('chip-gold', 'chip-copper'),
      border: 'border-chip-copper/40 dark:border-chip-copper/30',
      shadow: glassmorphism.shadow.depth.copper,
      glow: glassmorphism.glow.moderate.replace('chip-gold', 'chip-copper'),
      background: glassmorphism.background.copper,
      gradientOverlay: 'after:bg-gradient-to-br after:from-chip-copper/10 after:via-transparent after:to-chip-copper/8 after:opacity-50',
    },
    silver: {
      trace: glassmorphism.circuit.traceTop.replace('chip-gold', 'chip-silver'),
      border: 'border-chip-silver/40 dark:border-chip-silver/30',
      shadow: glassmorphism.shadow.depth.silver,
      glow: glassmorphism.glow.moderate.replace('chip-gold', 'chip-silver').replace('chip-copper', 'chip-silver'),
      background: glassmorphism.background.silver,
      gradientOverlay: 'after:bg-gradient-to-br after:from-chip-silver/10 after:via-transparent after:to-gray-300/5 after:opacity-40',
    },
    red: {
      trace: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-red-500 before:to-transparent',
      border: 'border-red-500/40 dark:border-red-400/30',
      shadow: 'shadow-[inset_0_2px_0_rgba(239,68,68,0.3),inset_0_-1px_0_rgba(0,0,0,0.1),0_4px_8px_rgba(239,68,68,0.2),0_8px_16px_rgba(0,0,0,0.1)]',
      glow: 'before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-red-500/15 before:via-transparent before:to-red-700/8 before:blur-md before:opacity-50 before:scale-110 before:-z-10',
      background: 'bg-gradient-to-br from-red-500/15 via-red-600/8 to-red-700/20 dark:from-red-600/25 dark:via-red-700/15 dark:to-red-800/30',
      gradientOverlay: 'after:bg-gradient-to-br after:from-red-500/8 after:via-transparent after:to-red-700/5 after:opacity-40',
    },
    dark: {
      trace: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-gray-600 before:to-transparent',
      border: 'border-gray-600/40 dark:border-gray-500/30',
      shadow: glassmorphism.shadow.depth.default,
      glow: glassmorphism.glow.subtle.replace('chip-gold', 'gray-400').replace('chip-copper', 'gray-500'),
      background: 'bg-gradient-to-br from-gray-200/15 via-gray-300/8 to-gray-400/20 dark:from-gray-700/25 dark:via-gray-800/15 dark:to-gray-900/30',
      gradientOverlay: 'after:bg-gradient-to-br after:from-gray-400/8 after:via-transparent after:to-gray-600/5 after:opacity-30',
    },
    none: {
      trace: '',
      border: 'border-gray-200/60 dark:border-chip-silver/20',
      shadow: glassmorphism.shadow.depth.default,
      glow: '',
      background: glassmorphism.background.subtle,
      gradientOverlay: '',
    }
  };
  
  const variantClasses = {
    default: cn(
      glassmorphism.background.card,
      glassmorphism.border.default,
      glassmorphism.shadow.depth.default,
      "rounded-lg relative overflow-hidden"
    ),
    bordered: cn(
      glassmorphism.background.strong,
      "border-2 rounded-lg",
      glassmorphism.shadow.depth.default,
      glassmorphism.glow.subtle,
      "relative overflow-hidden"
    ),
    chip: cn(
      glassmorphism.background.card,
      glassmorphism.shadow.depth.default,
      glassmorphism.glow.moderate,
      glassmorphism.circuit.traceTop,
      "rounded-sm border relative overflow-hidden",
      "before:rounded-t-sm after:absolute after:top-2 after:left-2 after:w-2 after:h-2 after:rounded-full after:bg-chip-gold/40 dark:after:bg-chip-gold/60 after:shadow-[0_0_4px_hsl(var(--chip-gold)/0.5)]"
    )
  };
  
  // Get the accent styles using the mapped color
  const accentStyles = accentColorMap[mappedColor] || accentColorMap.none;
  
  return (
    <div
      className={cn(
        "relative p-4 transition-all duration-300",
        variantClasses[variant],
        accentStyles.border,
        accentStyles.shadow,
        glassmorphism.interactive.base,
        "hover:scale-[1.01]",
        // Enhanced hover effects with sophisticated depth
        "hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_6px_16px_rgba(0,0,0,0.5)]",
        mappedColor !== 'none' && [
          accentStyles.glow,
          accentStyles.background
        ],
        className
      )}
      {...props}
    >
      {/* Sophisticated trace decoration for accent colors */}
      {mappedColor !== 'none' && (
        <div className={cn("absolute top-0 left-0 right-0", accentStyles.trace)} />
      )}
      
      {/* Enhanced gradient overlay for depth */}
      {mappedColor !== 'none' && accentStyles.gradientOverlay && (
        <div className={cn(
          "absolute top-0 left-0 right-0 h-16 rounded-t pointer-events-none",
          accentStyles.gradientOverlay
        )} />
      )}
      
      {/* Chip indicator for chip variant */}
      {variant === 'chip' && (
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-chip-gold/50 dark:bg-chip-gold/70 shadow-[0_0_6px_hsl(var(--chip-gold)/0.6)] animate-pulse" />
      )}
      
      {/* Content with proper layering */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};