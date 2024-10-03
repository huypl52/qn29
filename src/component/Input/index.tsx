import * as React from "react";
import { cn } from "~/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  // Base styles
  "w-full rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950",
        outline: "border-2 border-gray-200 bg-transparent dark:border-gray-800",
        filled: "border-transparent bg-gray-100 dark:bg-gray-800",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1 text-sm",
        lg: "h-12 px-6 py-3 text-lg",
      },
      state: {
        default: "",
        error: "border-red-500 focus:ring-red-500",
        success: "border-green-500 focus:ring-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  },
);

export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "state" | "prefix"
    >,
    VariantProps<typeof inputVariants> {
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      variant,
      size,
      state,
      error,
      disabled,
      prefix,
      suffix,
      ...props
    },
    ref,
  ) => {
    // Determine state based on error prop
    const inputState = error ? "error" : state;

    return (
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {typeof prefix === "string" ? (
              <span className="text-gray-500 dark:text-gray-400">{prefix}</span>
            ) : (
              prefix
            )}
          </div>
        )}

        <input
          type={type}
          className={cn(
            inputVariants({ variant, size, state: inputState }),
            disabled && "cursor-not-allowed opacity-50",
            prefix && "pl-10",
            suffix && "pr-10",
            className,
          )}
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />

        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {typeof suffix === "string" ? (
              <span className="text-gray-500 dark:text-gray-400">{suffix}</span>
            ) : (
              suffix
            )}
          </div>
        )}

        {error && (
          <div
            className="mt-1 text-sm text-red-500"
            id={props.id ? `${props.id}-error` : undefined}
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
