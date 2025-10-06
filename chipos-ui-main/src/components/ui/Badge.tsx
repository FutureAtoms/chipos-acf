import React from 'react';
import { cn, glassmorphism } from '../../features/ui/primitives/styles';
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  color?: 'gold' | 'copper' | 'silver' | 'success' | 'warning' | 'error' | 'info' | 'default';
  variant?: 'solid' | 'outline' | 'chip';
}
export const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'default',
  variant = 'outline',
  className = '',
  ...props
}) => {
  // Sophisticated chip-themed color system with matte embossed effects
  const colorMap = {
    solid: {
      gold: cn(
        glassmorphism.background.gold,
        'text-chip-copper dark:text-chip-gold font-semibold',
        glassmorphism.shadow.depth.gold,
        'border border-chip-gold/40 dark:border-chip-gold/30'
      ),
      copper: cn(
        glassmorphism.background.copper,
        'text-chip-copper dark:text-chip-copper font-semibold',
        glassmorphism.shadow.depth.copper,
        'border border-chip-copper/40 dark:border-chip-copper/30'
      ),
      silver: cn(
        glassmorphism.background.silver,
        'text-gray-700 dark:text-chip-silver font-semibold',
        glassmorphism.shadow.depth.silver,
        'border border-chip-silver/40 dark:border-chip-silver/30'
      ),
      success: cn(
        'bg-emerald-500/20 dark:bg-emerald-500/15',
        'text-emerald-700 dark:text-emerald-400 font-semibold',
        'border border-emerald-500/40 dark:border-emerald-400/30',
        glassmorphism.shadow.depth.default
      ),
      warning: cn(
        'bg-amber-500/20 dark:bg-amber-500/15',
        'text-amber-700 dark:text-amber-400 font-semibold',
        'border border-amber-500/40 dark:border-amber-400/30',
        glassmorphism.shadow.depth.default
      ),
      error: cn(
        'bg-red-500/20 dark:bg-red-500/15',
        'text-red-700 dark:text-red-400 font-semibold',
        'border border-red-500/40 dark:border-red-400/30',
        glassmorphism.shadow.depth.default
      ),
      info: cn(
        'bg-blue-500/20 dark:bg-blue-500/15',
        'text-blue-700 dark:text-blue-400 font-semibold',
        'border border-blue-500/40 dark:border-blue-400/30',
        glassmorphism.shadow.depth.default
      ),
      default: cn(
        glassmorphism.background.subtle,
        'text-gray-700 dark:text-chip-silver font-medium',
        glassmorphism.shadow.depth.default
      )
    },
    outline: {
      gold: cn(
        'border border-chip-gold/60 dark:border-chip-gold/40',
        'text-chip-copper dark:text-chip-gold font-semibold',
        'bg-chip-gold/5 dark:bg-chip-gold/5',
        'shadow-[0_2px_4px_rgba(255,184,77,0.15)]'
      ),
      copper: cn(
        'border border-chip-copper/60 dark:border-chip-copper/40',
        'text-chip-copper dark:text-chip-copper font-semibold',
        'bg-chip-copper/5 dark:bg-chip-copper/5',
        'shadow-[0_2px_4px_rgba(184,115,51,0.15)]'
      ),
      silver: cn(
        'border border-chip-silver/60 dark:border-chip-silver/40',
        'text-gray-700 dark:text-chip-silver font-semibold',
        'bg-chip-silver/5 dark:bg-chip-silver/5',
        'shadow-[0_2px_4px_rgba(192,192,192,0.15)]'
      ),
      success: cn(
        'border border-emerald-500/60 dark:border-emerald-400/40',
        'text-emerald-700 dark:text-emerald-400 font-semibold',
        'bg-emerald-50/50 dark:bg-emerald-500/5'
      ),
      warning: cn(
        'border border-amber-500/60 dark:border-amber-400/40',
        'text-amber-700 dark:text-amber-400 font-semibold',
        'bg-amber-50/50 dark:bg-amber-500/5'
      ),
      error: cn(
        'border border-red-500/60 dark:border-red-400/40',
        'text-red-700 dark:text-red-400 font-semibold',
        'bg-red-50/50 dark:bg-red-500/5'
      ),
      info: cn(
        'border border-blue-500/60 dark:border-blue-400/40',
        'text-blue-700 dark:text-blue-400 font-semibold',
        'bg-blue-50/50 dark:bg-blue-500/5'
      ),
      default: cn(
        glassmorphism.border.default,
        'text-gray-700 dark:text-chip-silver font-medium',
        'bg-gray-50/50 dark:bg-chip-dark/30'
      )
    },
    chip: {
      gold: cn(
        glassmorphism.background.gold,
        glassmorphism.shadow.depth.gold,
        glassmorphism.glow.subtle,
        'text-chip-copper dark:text-chip-gold font-bold',
        'border border-chip-gold/50 dark:border-chip-gold/40',
        // Mini circuit trace decoration
        'before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px]',
        'before:bg-gradient-to-r before:from-transparent before:via-chip-gold before:to-transparent',
        'relative overflow-hidden'
      ),
      copper: cn(
        glassmorphism.background.copper,
        glassmorphism.shadow.depth.copper,
        glassmorphism.glow.subtle,
        'text-chip-copper dark:text-chip-copper font-bold',
        'before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px]',
        'before:bg-gradient-to-r before:from-transparent before:via-chip-copper before:to-transparent',
        'relative overflow-hidden'
      ),
      silver: cn(
        glassmorphism.background.silver,
        glassmorphism.shadow.depth.silver,
        glassmorphism.glow.subtle,
        'text-gray-700 dark:text-chip-silver font-bold',
        'before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px]',
        'before:bg-gradient-to-r before:from-transparent before:via-chip-silver before:to-transparent',
        'relative overflow-hidden'
      ),
      success: cn(
        'bg-emerald-500/25 dark:bg-emerald-500/20',
        'text-emerald-800 dark:text-emerald-300 font-bold',
        'border border-emerald-500/50 dark:border-emerald-400/40',
        glassmorphism.shadow.depth.default,
        'relative overflow-hidden'
      ),
      warning: cn(
        'bg-amber-500/25 dark:bg-amber-500/20',
        'text-amber-800 dark:text-amber-300 font-bold',
        'border border-amber-500/50 dark:border-amber-400/40',
        glassmorphism.shadow.depth.default,
        'relative overflow-hidden'
      ),
      error: cn(
        'bg-red-500/25 dark:bg-red-500/20',
        'text-red-800 dark:text-red-300 font-bold',
        'border border-red-500/50 dark:border-red-400/40',
        glassmorphism.shadow.depth.default,
        'relative overflow-hidden'
      ),
      info: cn(
        'bg-blue-500/25 dark:bg-blue-500/20',
        'text-blue-800 dark:text-blue-300 font-bold',
        'border border-blue-500/50 dark:border-blue-400/40',
        glassmorphism.shadow.depth.default,
        'relative overflow-hidden'
      ),
      default: cn(
        glassmorphism.background.card,
        glassmorphism.shadow.depth.default,
        glassmorphism.glow.subtle,
        'text-gray-800 dark:text-chip-silver font-medium',
        'relative overflow-hidden'
      )
    }
  };

  return (
    <span 
      className={cn(
        // Base sophisticated badge styling
        'inline-flex items-center text-xs px-3 py-1.5 rounded-lg',
        'transition-all duration-300',
        glassmorphism.interactive.base,
        'hover:scale-105',
        // Dynamic color and variant styling
        colorMap[variant][color],
        className
      )} 
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </span>
  );
};