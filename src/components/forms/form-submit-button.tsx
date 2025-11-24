import { ComponentProps } from "react";

import { LoadingButton } from "@/components/ui/loading-button";

import { useFormContext } from "@/hooks/forms";

type Props = ComponentProps<"button">;

function FormSubmitButton({ children, disabled, type, ...props }: Props) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <LoadingButton type="submit" isLoading={isSubmitting} disabled={isSubmitting} {...props}>
          {children}
        </LoadingButton>
      )}
    </form.Subscribe>
  );
}

export { FormSubmitButton };
