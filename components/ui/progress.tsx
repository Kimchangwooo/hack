"use client";

import * as React from "react";
import { cn } from "./utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
          className,
        )}
        {...props}
      >
        <div
          className="bg-primary h-full transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
