"use client";

import { FormBaseProps } from "@/types/forms";

import { FormBase } from "@/components/forms/form-base";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";

import { useFieldContext } from "@/hooks/forms";

function MultiSelectFormInput({
  label,
  description,
  placeholder,
  children,
}: FormBaseProps & { placeholder?: string }) {
  const field = useFieldContext<string[]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase label={label} description={description}>
      <MultiSelect values={field.state.value} onValuesChange={(value) => field.handleChange(value)}>
        <MultiSelectTrigger
          className="w-full"
          aria-invalid={isInvalid}
          id={field.name}
          onBlur={field.handleBlur}
        >
          <MultiSelectValue overflowBehavior="cutoff" placeholder={placeholder} />
        </MultiSelectTrigger>
        <MultiSelectContent search={false}>{children}</MultiSelectContent>
      </MultiSelect>
    </FormBase>
  );
}

export { MultiSelectFormInput };
