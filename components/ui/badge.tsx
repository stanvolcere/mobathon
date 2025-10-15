import React, { ReactNode } from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  variant?: "default" | "success" | "warning" | "error";
  children?: ReactNode;
  asChild?: boolean;
}

function Badge({ className = "", variant = "default", children, asChild = false, ...props }: BadgeProps) {
  // Define some simple styles for variants
  const variantClasses = {
    default: "bg-gray-200 text-black",
    success: "bg-green-200 text-green-800",
    warning: "bg-yellow-200 text-yellow-800",
    error: "bg-red-200 text-red-800",
  };

  const classes = `inline-flex items-center rounded-full px-2 py-1 text-sm font-medium ${
    variantClasses.default
  } ${className}`;

  // Normally Slot allows passing another component as the wrapper.
  // For simplicity, we'll just render a <span>.
  const Comp = asChild ? React.Fragment : "span";

  return <Comp {...props} className={asChild ? undefined : classes}>{children}</Comp>;
}

export { Badge };
