import { useRef } from "react";
import { useDrop } from "react-dnd";
import { cn } from "../../../ui/primitives/styles";
import type { Task } from "../types";
import { getColumnColor, getColumnGlow, ItemTypes } from "../utils/task-styles";
import { TaskCard } from "./TaskCard";

interface KanbanColumnProps {
  status: Task["status"];
  title: string;
  tasks: Task[];
  projectId: string;
  onTaskMove: (taskId: string, newStatus: Task["status"]) => void;
  onTaskReorder: (taskId: string, targetIndex: number, status: Task["status"]) => void;
  onTaskEdit?: (task: Task) => void;
  onTaskDelete?: (task: Task) => void;
  hoveredTaskId: string | null;
  onTaskHover: (taskId: string | null) => void;
}

export const KanbanColumn = ({
  status,
  title,
  tasks,
  projectId,
  onTaskMove,
  onTaskReorder,
  onTaskEdit,
  onTaskDelete,
  hoveredTaskId,
  onTaskHover,
}: KanbanColumnProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: { id: string; status: Task["status"] }) => {
      if (item.status !== status) {
        onTaskMove(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  drop(ref);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col h-full",
        "bg-gradient-to-b from-cyber-black/40 to-cyber-black/20",
        "backdrop-blur-sm",
        "border-r border-cyber-cyan/10",
        "last:border-r-0",
        "relative",
        "transition-all duration-200",
        isOver && "bg-gradient-to-b from-cyber-cyan/10 to-cyber-magenta/5",
        isOver && "border-t-2 border-t-cyber-cyan/50",
        isOver && "shadow-[inset_0_2px_20px_rgba(0,255,255,0.1)]",
        isOver && "backdrop-blur-md",
      )}
    >
      {/* Column Header with Cyberpunk style */}
      <div
        className={cn(
          "text-center py-3 sticky top-0 z-10",
          "bg-gradient-to-b from-cyber-black/90 to-cyber-black/70",
          "backdrop-blur-md",
          "border-b border-cyber-cyan/20",
          "relative",
        )}
      >
        <h3 className={cn("font-mono text-sm font-bold uppercase tracking-wider", getColumnColor(status))}>{title}</h3>
        {/* Column header glow effect */}
        <div
          className={cn("absolute bottom-0 left-0 right-0 h-[1px]", getColumnGlow(status))}
        />
      </div>

      {/* Tasks Container */}
      <div className="px-2 flex-1 overflow-y-auto space-y-2 py-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        {tasks.length === 0 ? (
          <div className={cn("text-center py-8 text-gray-400 dark:text-gray-600 text-sm", "opacity-60")}>No tasks</div>
        ) : (
          tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              projectId={projectId}
              onTaskReorder={onTaskReorder}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
              hoveredTaskId={hoveredTaskId}
              onTaskHover={onTaskHover}
            />
          ))
        )}
      </div>
    </div>
  );
};
