import * as React from "react";
import { cn } from "~/lib/utils";

// Alert Description Component
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  >
    {children}
  </div>
));

AlertDescription.displayName = "AlertDescription";

export { AlertDescription };
