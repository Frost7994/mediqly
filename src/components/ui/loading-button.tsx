"use client";

import { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";

function LoadingButton({
  isLoading,
  children,
  ...rest
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    isLoading: boolean;
  }) {
  return (
    <Button disabled={isLoading} {...rest}>
      <LoadingSwap isLoading={isLoading}>{children}</LoadingSwap>
    </Button>
  );
}

export { LoadingButton };
