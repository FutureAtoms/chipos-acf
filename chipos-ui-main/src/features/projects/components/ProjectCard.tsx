import { motion } from "framer-motion";
import { Activity, CheckCircle2, ListTodo } from "lucide-react";
import type React from "react";
import { cn } from "../../ui/primitives/styles";
import { LiquidGlassCard } from "../../ui/magic/liquid-glass-card";
import type { Project } from "../types";
import { ProjectCardActions } from "./ProjectCardActions";

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  taskCounts: {
    todo: number;
    doing: number;
    review: number;
    done: number;
  };
  onSelect: (project: Project) => void;
  onPin: (e: React.MouseEvent, projectId: string) => void;
  onDelete: (e: React.MouseEvent, projectId: string, title: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isSelected,
  taskCounts,
  onSelect,
  onPin,
  onDelete,
}) => {
  return (
    <LiquidGlassCard
      role="listitem"
      onClick={() => onSelect(project)}
      active={isSelected}
      glow={project.pinned}
      glowColor={project.pinned ? "#FF9900" : "#FFD700"}
      className={cn(
        "w-72 min-h-[180px] cursor-pointer p-5 transition-all duration-300",
        isSelected && "border-[#FFD700]/60 shadow-[0_8px_32px_0_rgba(255,215,0,0.25)]",
        project.pinned && "border-[#FF9900]/60 shadow-[0_8px_32px_0_rgba(255,153,0,0.25)]",
      )}
    >
      {/* Title section */}
      <div className="flex items-center justify-center mb-6 min-h-[48px]">
        <h3
          className={cn(
            "font-semibold text-center leading-tight line-clamp-2 transition-all duration-300",
            "text-[#FFD700]/90",
            isSelected && "drop-shadow-[0_0_8px_rgba(255,215,0,0.8)] text-[#FFD700]",
            project.pinned && !isSelected && "text-[#FF9900]",
          )}
        >
          {project.title}
        </h3>
      </div>

      {/* Task count pills - macOS style */}
      <div className="flex items-stretch gap-3 mb-4">
        {/* Todo pill */}
        <motion.div
          className="relative flex-1"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {isSelected && (
            <div className="absolute inset-0 bg-pink-500/30 rounded-xl blur-lg -z-10" />
          )}
          <div
            className={cn(
              "relative h-16 rounded-xl overflow-hidden",
              "bg-gradient-to-br from-white/[0.12] to-white/[0.06]",
              "backdrop-blur-xl backdrop-saturate-150",
              "border border-white/10",
              "shadow-[0_4px_16px_0_rgba(0,0,0,0.25)]",
              "transition-all duration-300",
              isSelected && "border-pink-500/40 shadow-[0_4px_16px_0_rgba(236,72,153,0.3)]",
            )}
          >
            {/* Top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="flex flex-col items-center justify-center h-full px-2">
              <ListTodo
                className={cn(
                  "w-4 h-4 mb-1",
                  isSelected ? "text-pink-400" : "text-white/60",
                )}
              />
              <span
                className={cn(
                  "text-xl font-bold",
                  isSelected ? "text-pink-400" : "text-white/60",
                )}
              >
                {taskCounts.todo || 0}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Doing pill (includes review) */}
        <motion.div
          className="relative flex-1"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {isSelected && (
            <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-lg -z-10" />
          )}
          <div
            className={cn(
              "relative h-16 rounded-xl overflow-hidden",
              "bg-gradient-to-br from-white/[0.12] to-white/[0.06]",
              "backdrop-blur-xl backdrop-saturate-150",
              "border border-white/10",
              "shadow-[0_4px_16px_0_rgba(0,0,0,0.25)]",
              "transition-all duration-300",
              isSelected && "border-blue-500/40 shadow-[0_4px_16px_0_rgba(59,130,246,0.3)]",
            )}
          >
            {/* Top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="flex flex-col items-center justify-center h-full px-2">
              <Activity
                className={cn(
                  "w-4 h-4 mb-1",
                  isSelected ? "text-blue-400" : "text-white/60",
                )}
              />
              <span
                className={cn(
                  "text-xl font-bold",
                  isSelected ? "text-blue-400" : "text-white/60",
                )}
              >
                {(taskCounts.doing || 0) + (taskCounts.review || 0)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Done pill */}
        <motion.div
          className="relative flex-1"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {isSelected && (
            <div className="absolute inset-0 bg-green-500/30 rounded-xl blur-lg -z-10" />
          )}
          <div
            className={cn(
              "relative h-16 rounded-xl overflow-hidden",
              "bg-gradient-to-br from-white/[0.12] to-white/[0.06]",
              "backdrop-blur-xl backdrop-saturate-150",
              "border border-white/10",
              "shadow-[0_4px_16px_0_rgba(0,0,0,0.25)]",
              "transition-all duration-300",
              isSelected && "border-green-500/40 shadow-[0_4px_16px_0_rgba(34,197,94,0.3)]",
            )}
          >
            {/* Top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="flex flex-col items-center justify-center h-full px-2">
              <CheckCircle2
                className={cn(
                  "w-4 h-4 mb-1",
                  isSelected ? "text-green-400" : "text-white/60",
                )}
              />
              <span
                className={cn(
                  "text-xl font-bold",
                  isSelected ? "text-green-400" : "text-white/60",
                )}
              >
                {taskCounts.done || 0}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar with pinned indicator and actions */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        {/* Pinned indicator badge */}
        {project.pinned ? (
          <div className="px-2 py-1 bg-gradient-to-r from-purple-500/40 to-purple-600/30 backdrop-blur-sm text-purple-200 text-[10px] font-bold rounded-md border border-purple-400/30">
            DEFAULT
          </div>
        ) : (
          <div />
        )}

        {/* Action Buttons */}
        <ProjectCardActions
          projectId={project.id}
          projectTitle={project.title}
          isPinned={project.pinned}
          onPin={(e) => onPin(e, project.id)}
          onDelete={(e) => onDelete(e, project.id, project.title)}
        />
      </div>
    </LiquidGlassCard>
  );
};
