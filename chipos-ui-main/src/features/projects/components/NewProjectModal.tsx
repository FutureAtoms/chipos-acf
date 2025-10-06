import { Loader2 } from "lucide-react";
import type React from "react";
import { useId, useState } from "react";
import { LiquidGlassButton } from "../../ui/magic/liquid-glass-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/primitives/dialog";
import { Input } from "../../ui/primitives/input";
import { cn } from "../../ui/primitives/styles";
import { useCreateProject } from "../hooks/useProjectQueries";
import type { CreateProjectRequest } from "../types";

interface NewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ open, onOpenChange, onSuccess }) => {
  const projectNameId = useId();
  const projectDescriptionId = useId();

  const [formData, setFormData] = useState<CreateProjectRequest>({
    title: "",
    description: "",
  });

  const createProjectMutation = useCreateProject();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    createProjectMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ title: "", description: "" });
        onOpenChange(false);
        onSuccess?.();
      },
    });
  };

  const handleClose = () => {
    if (!createProjectMutation.isPending) {
      setFormData({ title: "", description: "" });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Start a new project to organize your tasks and documents.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-6">
            <div>
              <label
                htmlFor={projectNameId}
                className="block text-sm font-medium text-white/70 mb-2"
              >
                Project Name
              </label>
              <Input
                id={projectNameId}
                type="text"
                placeholder="Enter project name..."
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                disabled={createProjectMutation.isPending}
                className="w-full"
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor={projectDescriptionId}
                className="block text-sm font-medium text-white/70 mb-2"
              >
                Description (Optional)
              </label>
              <textarea
                id={projectDescriptionId}
                placeholder="Enter project description..."
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                disabled={createProjectMutation.isPending}
                className={cn(
                  "w-full resize-none rounded-lg px-3 py-2",
                  "bg-white/5 backdrop-blur-sm",
                  "border border-white/10",
                  "text-white/90 placeholder:text-white/40",
                  "focus:outline-none focus:border-[#00d9ff]/50",
                  "focus:ring-1 focus:ring-[#00d9ff]/30",
                  "transition-all duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <LiquidGlassButton
              type="button"
              onClick={handleClose}
              disabled={createProjectMutation.isPending}
            >
              Cancel
            </LiquidGlassButton>
            <LiquidGlassButton
              type="submit"
              variant="primary"
              disabled={createProjectMutation.isPending || !formData.title.trim()}
            >
              {createProjectMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </LiquidGlassButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
