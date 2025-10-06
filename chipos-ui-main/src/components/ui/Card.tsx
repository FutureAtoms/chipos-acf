import React from 'react';
import { cn } from '../../features/ui/primitives/styles';
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  accentColor?: 'cyan' | 'magenta' | 'yellow' | 'red' | 'green' | 'purple' | 'orange' | 'none';
  variant?: 'default' | 'bordered' | 'cyber' | 'terminal';
}
export const Card: React.FC<CardProps> = ({
  children,
  accentColor = 'none',
  variant = 'default',
  className = '',
  ...props
}) => {
  const accentColorMap = {
    cyan: {
      border: 'border-cyber-cyan/40',
      shadow: 'shadow-neon-cyan',
      glow: 'hover:shadow-[0_0_20px_hsl(var(--cyber-cyan)/0.3)]',
      background: 'bg-gradient-to-br from-cyber-cyan/5 via-cyber-dark/80 to-cyber-cyan/10',
      accent: 'bg-cyber-cyan',
      textGlow: 'text-shadow-neon-cyan',
    },
    magenta: {
      border: 'border-cyber-magenta/40',
      shadow: 'shadow-neon-magenta',
      glow: 'hover:shadow-[0_0_20px_hsl(var(--cyber-magenta)/0.3)]',
      background: 'bg-gradient-to-br from-cyber-magenta/5 via-cyber-dark/80 to-cyber-magenta/10',
      accent: 'bg-cyber-magenta',
      textGlow: 'text-shadow-neon-magenta',
    },
    yellow: {
      border: 'border-cyber-yellow/40',
      shadow: 'shadow-neon-yellow',
      glow: 'hover:shadow-[0_0_20px_hsl(var(--cyber-yellow)/0.3)]',
      background: 'bg-gradient-to-br from-cyber-yellow/5 via-cyber-dark/80 to-cyber-yellow/10',
      accent: 'bg-cyber-yellow',
      textGlow: 'text-shadow-neon-yellow',
    },
    red: {
      border: 'border-cyber-red/40',
      shadow: 'shadow-[0_0_10px_hsl(var(--cyber-red)/0.4)]',
      glow: 'hover:shadow-[0_0_20px_hsl(var(--cyber-red)/0.3)]',
      background: 'bg-gradient-to-br from-cyber-red/5 via-cyber-dark/80 to-cyber-red/10',
      accent: 'bg-cyber-red',
      textGlow: 'drop-shadow-[0_0_6px_hsl(var(--cyber-red))]',
    },
    green: {
      border: 'border-cyber-green/40',
      shadow: 'shadow-[0_0_10px_hsl(var(--cyber-green)/0.4)]',
      glow: 'hover:shadow-[0_0_20px_hsl(var(--cyber-green)/0.3)]',
      background: 'bg-gradient-to-br from-cyber-green/5 via-cyber-dark/80 to-cyber-green/10',
      accent: 'bg-cyber-green',
      textGlow: 'drop-shadow-[0_0_6px_hsl(var(--cyber-green))]',
    },
    purple: {
      border: 'border-cyber-purple/40',
      shadow: 'shadow-[0_0_10px_hsl(var(--cyber-purple)/0.4)]',
      glow: 'hover:shadow-[0_0_20px_hsl(var(--cyber-purple)/0.3)]',
      background: 'bg-gradient-to-br from-cyber-purple/5 via-cyber-dark/80 to-cyber-purple/10',
      accent: 'bg-cyber-purple',
      textGlow: 'drop-shadow-[0_0_6px_hsl(var(--cyber-purple))]',
    },
    orange: {
      border: 'border-cyber-orange/40',
      shadow: 'shadow-[0_0_10px_hsl(var(--cyber-orange)/0.4)]',
      glow: 'hover:shadow-[0_0_20px_hsl(var(--cyber-orange)/0.3)]',
      background: 'bg-gradient-to-br from-cyber-orange/5 via-cyber-dark/80 to-cyber-orange/10',
      accent: 'bg-cyber-orange',
      textGlow: 'drop-shadow-[0_0_6px_hsl(var(--cyber-orange))]',
    },
    none: {
      border: 'border-cyber-cyan/20',
      shadow: '',
      glow: '',
      background: 'bg-cyber-dark/80',
      accent: 'bg-cyber-cyan',
      textGlow: '',
    }
  };
  
  const variantClasses = {
    default: cn(
      "cyber-panel",
      "relative overflow-hidden",
      "transition-all duration-300"
    ),
    bordered: cn(
      "bg-cyber-darker/90 backdrop-blur-sm",
      "border-2 relative overflow-hidden",
      "transition-all duration-300"
    ),
    cyber: cn(
      "bg-gradient-to-br from-cyber-black/90 via-cyber-dark/70 to-cyber-black/95",
      "border border-cyber-cyan/30",
      "relative overflow-hidden",
      "backdrop-blur-sm",
      "transition-all duration-300",
      // Cyber geometric clipping
      "clip-path-[polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))]"
    ),
    terminal: cn(
      "bg-cyber-black/95 backdrop-blur-sm",
      "border border-cyber-green/40",
      "font-mono text-cyber-green",
      "relative overflow-hidden",
      "transition-all duration-300",
      // Terminal-style corners
      "before:absolute before:top-0 before:left-0 before:w-4 before:h-4 before:border-t-2 before:border-l-2 before:border-cyber-green/60",
      "after:absolute after:bottom-0 after:right-0 after:w-4 after:h-4 after:border-b-2 after:border-r-2 after:border-cyber-green/60"
    )
  };
  
  const accentStyles = accentColorMap[accentColor] || accentColorMap.none;
  
  return (
    <div
      className={cn(
        "relative p-4",
        variantClasses[variant],
        accentColor !== 'none' && [
          accentStyles.border,
          accentStyles.shadow,
          accentStyles.background,
          accentStyles.glow
        ],
        "hover:scale-[1.01]",
        className
      )}
      {...props}
    >
      {/* Cyberpunk data streams */}
      {accentColor !== 'none' && (
        <>
          {/* Top data stream */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-40" 
               style={{color: `hsl(var(--cyber-${accentColor}))`}} />
          
          {/* Corner accents */}
          <div className={cn(
            "absolute top-2 right-2 w-3 h-3",
            accentStyles.accent,
            "opacity-60 animate-pulse"
          )} 
          style={{clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%)'}} />
        </>
      )}
      
      {/* Matrix rain effect for cyber variant */}
      {variant === 'cyber' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <div className="animate-matrix-rain text-cyber-green text-xs leading-3 whitespace-nowrap">
            01010101010101010101010101010101
          </div>
        </div>
      )}
      
      {/* Terminal cursor for terminal variant */}
      {variant === 'terminal' && (
        <div className="absolute top-3 left-3 w-2 h-3 bg-cyber-green animate-pulse opacity-80" />
      )}
      
      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line opacity-20 pointer-events-none" />
      
      {/* Content with proper layering */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};