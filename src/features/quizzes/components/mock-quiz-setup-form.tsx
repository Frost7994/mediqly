"use client";

import Link from "next/link";

import { categories } from "@/data";
import { InfoIcon, MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MultiSelectGroup, MultiSelectItem } from "@/components/ui/multi-select";

import {
  MockQuizFormData as FormData,
  mockQuizFormDefaultValues as defaultValues,
  mockQuizFormSchema as schema,
} from "@/features/quizzes/schemas";

import { useAppForm } from "@/hooks/forms";

function MockQuizSetupForm() {
  // form methods
  const form = useAppForm({
    defaultValues: defaultValues satisfies FormData as FormData,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {},
  });

  return (
    <div className="space-y-6">
      <Card className="py-3">
        <CardContent className="flex items-center gap-4 px-3">
          <div className="bg-muted/50 h-fit w-fit rounded-md border p-2">
            <InfoIcon className="size-5" />
          </div>
          <div>
            <CardTitle className="text-sm font-medium">Preferences are preselected</CardTitle>
            <CardDescription className="text-sm">
              These can be adjusted in the{" "}
              <Link href="/settings" className="hover:text-foreground underline">
                users settings
              </Link>
            </CardDescription>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mock Quiz</CardTitle>
          <CardDescription>This is a mock quiz form for demonstration purposes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <form.AppField name="categories">
              {(field) => (
                <field.MultiSelect
                  label="Categories"
                  description="Select one or multiple categories"
                  placeholder="Select a category"
                >
                  <MultiSelectGroup>
                    {categories.map((category) => (
                      <MultiSelectItem key={category.id} value={category.id} className="capitalize">
                        {category.name}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </field.MultiSelect>
              )}
            </form.AppField>
            <form.AppField name="numberOfQuestions">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Number of questions</FieldLabel>
                      <FieldDescription>
                        Choose how many questions you want in the quiz (5-50).
                      </FieldDescription>
                    </FieldContent>
                    <ButtonGroup>
                      <Input
                        type="number"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(Number(e.target.value))}
                        aria-invalid={isInvalid}
                        className="[&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          field.setValue(Math.max(0, field.state.value - 5));
                        }}
                      >
                        <MinusIcon />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          field.setValue(Math.min(50, field.state.value + 5));
                        }}
                      >
                        <PlusIcon />
                      </Button>
                    </ButtonGroup>

                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.AppField>

            <div className="flex items-center justify-end">
              <form.AppForm>
                <form.SubmitButton>Start mock quiz</form.SubmitButton>
              </form.AppForm>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export { MockQuizSetupForm };
