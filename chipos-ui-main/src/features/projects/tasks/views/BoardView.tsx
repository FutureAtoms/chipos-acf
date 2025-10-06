import { useState } from "react";
import { KanbanColumn } from "../components/KanbanColumn";
import type { Task } from "../types";

interface BoardViewProps {
  tasks: Task[];
  projectId: string;
  onTaskMove: (taskId: string, newStatus: Task["status"]) => void;
  onTaskReorder: (taskId: string, targetIndex: number, status: Task["status"]) => void;
  onTaskEdit?: (task: Task) => void;
  onTaskDelete?: (task: Task) => void;
}

export const BoardView = ({
  tasks,
  projectId,
  onTaskMove,
  onTaskReorder,
  onTaskEdit,
  onTaskDelete,
}: BoardViewProps) => {
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);

  // Simple task filtering for board view
  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status).sort((a, b) => a.task_order - b.task_order);
  };

  // Column configuration
  const columns: Array<{ status: Task["status"]; title: string }> = [
    { status: "todo", title: "Todo" },
    { status: "doing", title: "Doing" },
    { status: "review", title: "Review" },
    { status: "done", title: "Done" },
  ];

  return (
    <div className="flex flex-col h-full min-h-[70vh] relative">
      {/* Cyberpunk background with subtle gradient separations */}
      <div className="absolute inset-0 bg-cyber-black/20 pointer-events-none">
        {/* Subtle vertical gradients for column separation */}
        <div className="absolute inset-0 grid grid-cols-4 gap-1">
          <div className="bg-gradient-to-br from-cyber-cyan/5 via-transparent to-transparent"></div>
          <div className="bg-gradient-to-br from-cyber-magenta/5 via-transparent to-transparent"></div>
          <div className="bg-gradient-to-br from-cyber-yellow/5 via-transparent to-transparent"></div>
          <div className="bg-gradient-to-br from-cyber-green/5 via-transparent to-transparent"></div>
        </div>
      </div>
      
      {/* Board Columns Grid */}
      <div className="grid grid-cols-4 gap-1 flex-1 p-2 relative z-10">
        {columns.map(({ status, title }) => (
          <KanbanColumn
            key={status}
            status={status}
            title={title}
            tasks={getTasksByStatus(status)}
            projectId={projectId}
            onTaskMove={onTaskMove}
            onTaskReorder={onTaskReorder}
            onTaskEdit={onTaskEdit}
            onTaskDelete={onTaskDelete}
            hoveredTaskId={hoveredTaskId}
            onTaskHover={setHoveredTaskId}
          />
        ))}
      </div>
    </div>
  );
};
