"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { MOCK } from "@/constants";
import { categories } from "@/data";
import { shuffleArray, sleep, toast } from "@/utils";
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
import { useQuizStore } from "@/features/quizzes/stores";

import { useTRPCClient } from "@/lib/trpc/client";

import { useAppForm } from "@/hooks/forms";

function MockQuizSetupForm() {
  // store actions
  const handleStartClick = useQuizStore((state) => state.handleStartClick);

  // router destructure
  const { push } = useRouter();

  const trpcClient = useTRPCClient();

  // form methods
  const form = useAppForm({
    defaultValues: defaultValues satisfies FormData as FormData,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      // simulate form submission
      await sleep({ ms: 800 });

      //+ TODO: get questions from API using TRPC
      const questions = await trpcClient.questions.read.query({
        categories: value.categories.map((cat) => ({ id: cat })),
      });

      const formattedQuestions = shuffleArray(questions)
        .slice(0, value.numberOfQuestions)
        .map((q) => ({
          ...q,
          options: shuffleArray(q.options),
        }));

      // set the store state
      await handleStartClick({
        type: MOCK,
        categories: value.categories.map((cat) => ({ id: cat })),
        questions: formattedQuestions,

        timerActive: false,
        nudgesActive: true,
        promptsActive: true,
      });

      // show toast
      toast({
        message: `Mock quiz started with ${value.categories.length} categor${value.categories.length !== 1 ? "ies" : "y"} and ${value.numberOfQuestions} questions! Redirecting..`,
      });

      // redirect to mock quiz page
      push("/quiz");

      // reset form
      form.reset();
    },
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
