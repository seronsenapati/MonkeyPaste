import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-100 shadow-soft",
        destructive: "rounded-2xl bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "rounded-2xl border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground hover:scale-[1.02]",
        secondary: "rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "rounded-xl hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-secondary font-extrabold hover:bg-[position:100%_0] hover:scale-[1.03] hover:-translate-y-1 active:scale-100 shadow-glow hover:shadow-xl transition-all duration-500",
        soft: "rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 hover:scale-[1.02]",
        glass: "rounded-2xl glass text-foreground hover:bg-background/80 hover:scale-[1.02]",
      },
      size: {
        default: "h-12 px-6 py-2.5",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-12 text-lg",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
