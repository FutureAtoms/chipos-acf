import React from "react";
import { cn, glassmorphism, compoundStyles } from "./styles";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          // Base sophisticated matte embossed input
          "w-full rounded-lg py-3 px-4",
          compoundStyles.input,
          glassmorphism.interactive.focus,
          // Enhanced typography
          "text-gray-900 dark:text-chip-silver font-medium",
          "placeholder:text-gray-500 dark:placeholder:text-gray-400",
          // Advanced focus states with chip aesthetic  
          "focus:outline-none",
          "focus:border-chip-gold/50 dark:focus:border-chip-gold/40",
          "focus:shadow-[inset_0_2px_0_rgba(255,184,77,0.3),0_4px_12px_rgba(255,184,77,0.25)]",
          "focus:scale-[1.01]",
          // Sophisticated hover effects
          "hover:border-chip-gold/30 dark:hover:border-chip-gold/25",
          "hover:shadow-[0_2px_8px_rgba(255,184,77,0.15)]",
          // Enhanced disabled state
          glassmorphism.interactive.disabled,
          // Error state with embossed styling
          error && [
            "border-red-500/60 dark:border-red-400/50",
            "focus:border-red-500 focus:shadow-[inset_0_2px_0_rgba(239,68,68,0.3),0_4px_12px_rgba(239,68,68,0.25)]",
            "bg-red-50/30 dark:bg-red-950/20"
          ],
          className,
        )}
        ref={ref}
        {...props}
      />
      
      {/* Subtle ambient glow for focus enhancement */}
      <div className={cn(
        "absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-300",
        "bg-gradient-to-br from-chip-gold/10 via-transparent to-chip-copper/5",
        "blur-sm scale-105",
        "peer-focus:opacity-100"
      )} />
    </div>
  );
});

Input.displayName = "Input";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, error, ...props }, ref) => {
  return (
    <div className="relative">
      <textarea
        className={cn(
          // Base sophisticated matte embossed textarea
          "w-full rounded-lg py-3 px-4",
          compoundStyles.input,
          glassmorphism.interactive.focus,
          // Enhanced typography and sizing
          "text-gray-900 dark:text-chip-silver font-medium",
          "placeholder:text-gray-500 dark:placeholder:text-gray-400",
          "resize-y min-h-[100px]",
          // Advanced focus states with chip aesthetic
          "focus:outline-none",
          "focus:border-chip-gold/50 dark:focus:border-chip-gold/40",
          "focus:shadow-[inset_0_2px_0_rgba(255,184,77,0.3),0_4px_12px_rgba(255,184,77,0.25)]",
          "focus:scale-[1.01]",
          // Sophisticated hover effects
          "hover:border-chip-gold/30 dark:hover:border-chip-gold/25",
          "hover:shadow-[0_2px_8px_rgba(255,184,77,0.15)]",
          // Enhanced disabled state
          glassmorphism.interactive.disabled,
          // Error state with embossed styling
          error && [
            "border-red-500/60 dark:border-red-400/50",
            "focus:border-red-500 focus:shadow-[inset_0_2px_0_rgba(239,68,68,0.3),0_4px_12px_rgba(239,68,68,0.25)]",
            "bg-red-50/30 dark:bg-red-950/20"
          ],
          className,
        )}
        ref={ref}
        {...props}
      />
      
      {/* Subtle ambient glow for focus enhancement */}
      <div className={cn(
        "absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-300",
        "bg-gradient-to-br from-chip-gold/10 via-transparent to-chip-copper/5",
        "blur-sm scale-105",
        "peer-focus:opacity-100"
      )} />
    </div>
  );
});

TextArea.displayName = "TextArea";

// Label component for form fields
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      // biome-ignore lint/a11y/noLabelWithoutControl: htmlFor is passed through props spread
      <label
        ref={ref}
        className={cn(
          "block text-sm font-semibold tracking-wide",
          "text-gray-800 dark:text-chip-silver",
          "mb-2",
          // Subtle embossed text effect
          "drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_2px_rgba(255,184,77,0.1)]",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-red-600 dark:text-red-400 ml-1 font-bold drop-shadow-[0_1px_1px_rgba(239,68,68,0.3)]">
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = "Label";

// FormField wrapper with sophisticated spacing and embossed container
export interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "space-y-2 relative",
      // Subtle embossed container for form fields
      "p-1 rounded-lg",
      className
    )}>
      {children}
    </div>
  );
};

// FormGrid with sophisticated spacing and chip-inspired layout
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
      "grid gap-6",
      gridCols[columns],
      // Subtle embossed grid container
      "p-2 rounded-xl",
      className
    )}>
      {children}
    </div>
  );
};
