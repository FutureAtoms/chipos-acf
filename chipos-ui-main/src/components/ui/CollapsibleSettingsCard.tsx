import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { LiquidGlassCard } from '../../features/ui/magic/liquid-glass-card';

interface CollapsibleSettingsCardProps {
  title: string;
  icon: LucideIcon;
  accentColor?: 'purple' | 'green' | 'pink' | 'blue' | 'cyan' | 'orange';
  children: React.ReactNode;
  defaultExpanded?: boolean;
  storageKey?: string;
}

export const CollapsibleSettingsCard: React.FC<CollapsibleSettingsCardProps> = ({
  title,
  icon: Icon,
  accentColor = 'blue',
  children,
  defaultExpanded = true,
  storageKey
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Load saved state from localStorage
  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(`settings-card-${storageKey}`);
      if (saved !== null) {
        setIsExpanded(saved === 'true');
      }
    }
  }, [storageKey]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (storageKey) {
      localStorage.setItem(`settings-card-${storageKey}`, String(!isExpanded));
    }
  };

  // macOS-style subtle color accents
  const iconColorMap = {
    purple: 'text-purple-400',
    green: 'text-green-400',
    pink: 'text-pink-400',
    blue: 'text-blue-400',
    cyan: 'text-cyan-400',
    orange: 'text-orange-400'
  };

  return (
    <LiquidGlassCard className="p-0 overflow-hidden">
      {/* Header - clickable to toggle */}
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <Icon className={`${iconColorMap[accentColor]} w-5 h-5`} />
          <h2 className="text-lg font-semibold text-white/90">
            {title}
          </h2>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-white/60" />
        </motion.div>
      </button>

      {/* Content with smooth expand/collapse */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: 0.3,
                ease: [0.04, 0.62, 0.23, 0.98]
              },
              opacity: {
                duration: 0.2,
                ease: "easeInOut"
              }
            }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pb-4 pt-2 border-t border-white/5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LiquidGlassCard>
  );
};
