import { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/utils/cn";

function NavbarHeader({ className, children, ...rest }: React.ComponentProps<"header">) {
  return (
    <header className={cn("shrink-0 border-b", className)} {...rest}>
      {children}
    </header>
  );
}

function NavbarContainer({ className, children, ...rest }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex h-13 shrink-0 items-center justify-between px-4", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

function NavbarButton({
  variant = "outline",
  size = "icon",
  className,
  children,
  asChild,
  ...rest
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn("size-8", className)}
      {...rest}
      asChild={asChild}
    >
      {children}
    </Button>
  );
}

export { NavbarButton, NavbarContainer, NavbarHeader };
