"use client";

import { Container } from "@/components/ui/container";
import { Page, PageContent, PageDescription, PageHeader, PageTitle } from "@/components/ui/page";

import { AnswerButton } from "@/features/quizzes/components/answer-button";
import { FlagButton } from "@/features/quizzes/components/flag-button";
import { NextButton } from "@/features/quizzes/components/next-button";
import { NudgeButton } from "@/features/quizzes/components/nudge-button";
import { PreviousButton } from "@/features/quizzes/components/previous-button";
import { PromptButton } from "@/features/quizzes/components/prompt-button";
import { SubmitButton } from "@/features/quizzes/components/submit-button";
import { useQuizStore } from "@/features/quizzes/stores";

export default function QuizPage() {
  // store state
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const questions = useQuizStore((state) => state.questions);
  const currentQuestion = useQuizStore((state) => state.currentQuestion);
  const type = useQuizStore((state) => state.type);

  return (
    <Page className="flex h-full flex-col">
      <PageHeader className="border-b">
        <Container>
          <PageTitle>{type.charAt(0).toUpperCase() + type.slice(1)} Quiz</PageTitle>
          <PageDescription>
            Question {currentQuestionIndex + 1} of {questions.length}
          </PageDescription>
        </Container>
      </PageHeader>
      <PageContent className="grow">
        <Container className="h-full">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <FlagButton />
              <div className="space-x-2">
                <NudgeButton />
                <PromptButton />
              </div>
            </div>
            <div className="mt-12 flex grow flex-col justify-end gap-4">
              <div>
                <p className="font-medium">Question</p>
                <p>{currentQuestion.question}</p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                {currentQuestion.options.map((option) => (
                  <AnswerButton key={option.id} option={option} />
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="space-x-1 sm:space-x-2">
                <PreviousButton />
                <NextButton />
              </div>
              <SubmitButton />
            </div>
          </div>
        </Container>
      </PageContent>
    </Page>
  );
}
