import { Tag } from "lucide-react";
import type React from "react";
import { useCallback, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { LiquidGlassCard } from "../../../ui/magic/liquid-glass-card";
import { useTaskActions } from "../hooks";
import type { Assignee, Task } from "../types";
import { getOrderColor, getOrderGlow, ItemTypes } from "../utils/task-styles";
import { TaskAssignee } from "./TaskAssignee";
import { TaskCardActions } from "./TaskCardActions";
import { type Priority, TaskPriority } from "./TaskPriority";

export interface TaskCardProps {
  task: Task;
  index: number;
  projectId: string;
  onTaskReorder: (taskId: string, targetIndex: number, status: Task["status"]) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  hoveredTaskId?: string | null;
  onTaskHover?: (taskId: string | null) => void;
  selectedTasks?: Set<string>;
  onTaskSelect?: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  projectId,
  onTaskReorder,
  onEdit,
  onDelete,
  hoveredTaskId,
  onTaskHover,
  selectedTasks,
  onTaskSelect,
}) => {
  const [localPriority, setLocalPriority] = useState<Priority>("medium");
  const { changeAssignee, isUpdating } = useTaskActions(projectId);

  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit(task);
    }
  }, [onEdit, task]);

  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete(task);
    }
  }, [onDelete, task]);

  const handlePriorityChange = useCallback((priority: Priority) => {
    setLocalPriority(priority);
  }, []);

  const handleAssigneeChange = useCallback(
    (newAssignee: Assignee) => {
      changeAssignee(task.id, newAssignee);
    },
    [changeAssignee, task.id],
  );

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id, status: task.status, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover: (draggedItem: { id: string; status: Task["status"]; index: number }, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      if (draggedItem.id === task.id) return;
      if (draggedItem.status !== task.status) return;

      const draggedIndex = draggedItem.index;
      const hoveredIndex = index;

      if (draggedIndex === hoveredIndex) return;

      onTaskReorder(draggedItem.id, hoveredIndex, task.status);
      draggedItem.index = hoveredIndex;
    },
  });

  const isHighlighted = hoveredTaskId === task.id;
  const isSelected = selectedTasks?.has(task.id) || false;

  const handleMouseEnter = () => {
    onTaskHover?.(task.id);
  };

  const handleMouseLeave = () => {
    onTaskHover?.(null);
  };

  const handleTaskClick = (e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.stopPropagation();
      onTaskSelect?.(task.id);
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      role="button"
      tabIndex={0}
      className={`w-full min-h-[140px] cursor-move relative transition-all duration-200 group ${isDragging ? "opacity-50 scale-95" : "scale-100 opacity-100"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTaskClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (onEdit) {
            onEdit(task);
          }
        }
      }}
    >
      <LiquidGlassCard
        hover={!isDragging}
        active={isSelected || isHighlighted}
        className="w-full min-h-[140px] h-full p-3"
      >
        {/* Priority indicator stripe */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 ${getOrderColor(task.task_order)} ${getOrderGlow(task.task_order)} rounded-l-xl opacity-60 group-hover:w-1.5 group-hover:opacity-100 transition-all duration-300`}
        />

        {/* Content */}
        <div className="flex flex-col h-full pl-2">
          {/* Header with feature tag and actions */}
          <div className="flex items-center gap-2 mb-2">
            {task.feature && (
              <div
                className="px-2 py-0.5 rounded-md text-xs font-medium flex items-center gap-1 backdrop-blur-sm border"
                style={{
                  backgroundColor: `${task.featureColor}15`,
                  borderColor: `${task.featureColor}40`,
                  color: task.featureColor,
                }}
              >
                <Tag className="w-3 h-3" />
                {task.feature}
              </div>
            )}

            <div className="ml-auto flex items-center gap-1">
              <TaskCardActions
                taskId={task.id}
                taskTitle={task.title}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={false}
              />
            </div>
          </div>

          {/* Title */}
          <h4
            className="text-sm font-medium text-white/90 mb-2 line-clamp-2"
            title={task.title}
          >
            {task.title}
          </h4>

          {/* Description */}
          {task.description && (
            <div className="mb-2 flex-1">
              <p className="text-xs text-white/60 line-clamp-3 whitespace-pre-wrap">
                {task.description}
              </p>
            </div>
          )}

          {!task.description && <div className="flex-1" />}

          {/* Footer with assignee and priority */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
            <TaskAssignee
              assignee={task.assignee}
              onAssigneeChange={handleAssigneeChange}
              isLoading={isUpdating}
            />
            <TaskPriority
              priority={localPriority}
              onPriorityChange={handlePriorityChange}
              isLoading={false}
            />
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
};
