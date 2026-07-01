import * as React from "react";
import { cn } from "../../lib/cn";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-14 w-full rounded-full px-6 text-base text-white placeholder:text-white/40",
      "bg-white/5 ring-1 ring-inset ring-white/15 backdrop-blur",
      "transition-colors duration-300",
      "focus:outline-none focus:ring-2 focus:ring-white/50",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
