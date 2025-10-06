import React from "react";
import { cn } from "./styles";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

// macOS Liquid Glass input
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full rounded-lg px-3 py-2",
        "bg-white/5 backdrop-blur-sm",
        "border border-white/10",
        "text-white/90 placeholder:text-white/40",
        "focus:outline-none focus:border-[#00d9ff]/50",
        "focus:ring-1 focus:ring-[#00d9ff]/30",
        "transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error && [
          "border-red-500/50",
          "focus:border-red-500/70 focus:ring-red-500/30",
        ],
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

// macOS Liquid Glass textarea
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, error, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg px-3 py-2",
        "bg-white/5 backdrop-blur-sm",
        "border border-white/10",
        "text-white/90 placeholder:text-white/40",
        "focus:outline-none focus:border-[#00d9ff]/50",
        "focus:ring-1 focus:ring-[#00d9ff]/30",
        "transition-all duration-200",
        "resize-y min-h-[100px]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error && [
          "border-red-500/50",
          "focus:border-red-500/70 focus:ring-red-500/30",
        ],
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

TextArea.displayName = "TextArea";

// macOS-style label
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "block text-sm font-medium",
          "text-white/70",
          "mb-2",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-red-400 ml-1">*</span>
        )}
      </label>
    );
  },
);

Label.displayName = "Label";

// Form field wrapper
export interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ children, className }) => {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  );
};

// Form grid with macOS spacing
export interface FormGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3;
}

export const FormGrid: React.FC<FormGridProps> = ({ children, className, columns = 2 }) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={cn(
      "grid gap-4",
      gridCols[columns],
      className
    )}>
      {children}
    </div>
  );
};
