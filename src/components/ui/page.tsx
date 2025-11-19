import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

const pageTitleVariants = cva("text-xl font-medium");
const pageDescriptionVariants = cva("text-muted-foreground text-sm");

function Page({
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof pageTitleVariants>) {
  return <div className={cn("", className)} {...props} />;
}

function PageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("py-6 sm:py-10", className)} {...props} />;
}

function PageTitle({
  className,
  ...props
}: React.ComponentProps<"h2"> & VariantProps<typeof pageTitleVariants>) {
  return <h2 className={cn(pageTitleVariants(), className)} {...props} />;
}

function PageDescription({
  className,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof pageDescriptionVariants>) {
  return <p className={cn(pageDescriptionVariants(), className)} {...props} />;
}

function PageContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("py-6", className)} {...props} />;
}

export { Page, PageContent, PageDescription, PageHeader, PageTitle, pageDescriptionVariants };
