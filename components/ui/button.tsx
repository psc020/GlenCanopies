"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl border text-[15px] font-medium tracking-[-0.012em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground shadow-[0_12px_26px_-18px_rgba(166,33,3,0.42)] hover:bg-primary/95",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/85",
        outline:
          "border-border bg-card text-foreground hover:border-primary/25 hover:bg-muted",
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-foreground/4",
        link: "border-transparent bg-transparent p-0 text-primary underline-offset-4 hover:text-primary/80 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-[14px]",
        lg: "h-12 px-6 text-[17px]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
