"use client";

import { InputHTMLAttributes } from "react";

import { FormControlProps } from "@/types/forms";

import { FormBase } from "@/components/forms/form-base";
import { Input } from "@/components/ui/input";

import { useFieldContext } from "@/hooks/forms";

function BasicFormInput({
  label,
  description,
  ...rest
}: FormControlProps & InputHTMLAttributes<HTMLInputElement>) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase label={label} description={description}>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        {...rest}
      />
    </FormBase>
  );
}

export { BasicFormInput };
