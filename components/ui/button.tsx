import * as React from "react";
import { Slot } from "./ui_radix";

import { cn } from "./utils";

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  any & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn({ variant, size, className })}
      {...props}
    />
  );
}

export { Button };
