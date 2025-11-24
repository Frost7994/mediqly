"use client";

import { FormBaseProps } from "@/types/forms";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { useFieldContext } from "@/hooks/forms";

function FormBase({ label, description, children }: FormBaseProps) {
  const field = useFieldContext();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldContent>
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
      {children}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

export { FormBase };
