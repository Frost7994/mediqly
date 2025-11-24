import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { BasicFormInput } from "@/components/forms/basic-form-input";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import { MultiSelectFormInput } from "@/components/forms/multi-select-form-input";

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldComponents: {
    Input: BasicFormInput,
    MultiSelect: MultiSelectFormInput,
  },
  formComponents: {
    SubmitButton: FormSubmitButton,
  },
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext, withFieldGroup, withForm };
