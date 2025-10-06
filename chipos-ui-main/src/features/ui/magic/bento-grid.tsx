import { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
}

export const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-white/5 backdrop-blur-sm [box-shadow:0_0_0_1px_rgba(0,217,255,.1),0_2px_4px_rgba(0,217,255,.05),0_12px_24px_rgba(0,102,255,.05)]",
      // dark styles with ChipOS Tron colors
      "dark:bg-black/40 transform-gpu dark:[box-shadow:0_-20px_80px_-20px_rgba(0,217,255,0.2)_inset] dark:[border:1px_solid_rgba(0,217,255,.2)]",
      className
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-[#00d9ff] transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-semibold text-white">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    {href && cta && (
      <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <button
          className="pointer-events-auto flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#00d9ff] to-[#0066ff] px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:scale-105"
          onClick={() => window.location.href = href}
        >
          {cta}
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    )}
  </div>
);