import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type React from "react";
import { LiquidGlassButton } from "../../ui/magic/liquid-glass-card";

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
        className="text-3xl font-bold text-white/90 flex items-center gap-3"
        variants={titleVariants}
      >
        <div className="relative w-12 h-12">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-xl bg-[#00d9ff]/30 blur-lg opacity-75" />

          {/* Logo container with Liquid Glass effect */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-white/[0.15] to-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_8px_16px_0_rgba(0,0,0,0.3)] overflow-hidden">
            {/* Top specular highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <img
              src="/logo-neon.png"
              alt="Projects"
              className="w-12 h-12 relative z-10 p-2"
            />
          </div>
        </div>
        Projects
      </motion.h1>

      <LiquidGlassButton onClick={onNewProject} variant="primary">
        <Plus className="w-4 h-4 mr-2" />
        NEW PROJECT
      </LiquidGlassButton>
    </motion.div>
  );
};
