import * as React from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "default" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-black hover:bg-white/90 shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_10px_30px_-10px_rgba(255,255,255,0.35)]",
  secondary:
    "bg-white/5 text-white ring-1 ring-inset ring-white/15 backdrop-blur hover:bg-white/10 hover:ring-white/25",
  ghost: "bg-transparent text-white/70 hover:text-white",
};

const sizes: Record<Size, string> = {
  default: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-base",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-medium",
        "transition-all duration-300 will-change-transform",
        "hover:-translate-y-0.5 active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
