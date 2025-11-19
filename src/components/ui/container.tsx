import { cn } from "@/utils/cn";

function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("container mx-auto max-w-7xl px-4 @xl/app:px-6", className)} {...props} />
  );
}

export { Container };
