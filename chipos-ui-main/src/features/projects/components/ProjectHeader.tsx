import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type React from "react";
import { Button } from "../../ui/primitives/button";

interface ProjectHeaderProps {
  onNewProject: () => void;
}

const titleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ onNewProject }) => {
  return (
    <motion.div
      className="flex items-center justify-between mb-8"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3"
        variants={titleVariants}
      >
        <div className="relative w-14 h-14">
          {/* Ambient glow layers */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-chip-gold/25 via-transparent to-chip-copper/15 blur-md opacity-80 scale-110" />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-chip-gold/35 via-chip-gold/15 to-transparent blur-sm opacity-60 scale-105" />
          
          {/* Embossed container */}
          <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100/85 via-gray-50/70 to-gray-200/50 dark:from-chip-dark/95 dark:via-gray-900/80 dark:to-black/90 shadow-[inset_0_2px_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_2px_0_rgba(255,184,77,0.3)] shadow-[0_6px_12px_rgba(0,0,0,0.2)] dark:shadow-[0_6px_12px_rgba(0,0,0,0.5)] border border-gray-200/70 dark:border-chip-gold/25">
            <img
              src="/logo-neon.png"
              alt="Projects"
              className="w-14 h-14 filter saturate-115 contrast-110 drop-shadow-[0_3px_6px_rgba(0,0,0,0.25)] relative z-10"
            />
          </div>
        </div>
        Projects
      </motion.h1>
      <Button onClick={onNewProject} variant="cyan" className="shadow-lg shadow-cyan-500/20">
        <Plus className="w-4 h-4 mr-2" />
        New Project
      </Button>
    </motion.div>
  );
};
