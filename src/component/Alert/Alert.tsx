import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";
import {
  IoCheckmarkCircle,
  IoClose,
  IoCloseCircle,
  IoInformationCircle,
  IoWarning,
} from "react-icons/io5";
import type { IconType } from "react-icons";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-red-500/50 text-red-600 dark:border-red-500 [&>svg]:text-red-600 bg-red-50 dark:bg-red-900/10",
        success:
          "border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-600 bg-green-50 dark:bg-green-900/10",
        warning:
          "border-yellow-500/50 text-yellow-600 dark:border-yellow-500 [&>svg]:text-yellow-600 bg-yellow-50 dark:bg-yellow-900/10",
        info: "border-blue-500/50 text-blue-600 dark:border-blue-500 [&>svg]:text-blue-600 bg-blue-50 dark:bg-blue-900/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const iconMap: Record<string, IconType> = {
  default: IoInformationCircle,
  info: IoInformationCircle,
  success: IoCheckmarkCircle,
  warning: IoWarning,
  destructive: IoCloseCircle,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: IconType;
  onClose?: () => void;
  showIcon?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "default",
      icon,
      onClose,
      showIcon = true,
      children,
      ...props
    },
    ref,
  ) => {
    const Icon = icon || iconMap[variant || "default"];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {showIcon && <Icon className="h-4 w-4" />}
        <div
          className={cn(
            "flex flex-1 justify-between gap-x-2",
            !showIcon && "pl-0",
          )}
        >
          <div className="flex-1">{children}</div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              aria-label="Close alert"
            >
              <IoClose className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  },
);

Alert.displayName = "Alert";

export { Alert };
