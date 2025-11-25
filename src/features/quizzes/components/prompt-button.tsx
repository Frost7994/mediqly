"use client";

import { NO_OF_PROMPTS, PROMPT } from "@/constants";
import { useIsMobile } from "@/hooks";

import { Button } from "@/components/ui/button";

import { useQuizStore } from "@/features/quizzes/stores";

function PromptButton() {
  // store state
  const hints = useQuizStore((state) => state.hints);

  // store actions
  const handlePromptClick = useQuizStore((state) => state.handlePromptClick);

  // helpers
  const hasAvailablePrompts = () => {
    return hints.filter((hint) => hint.type === PROMPT).length <= NO_OF_PROMPTS;
  };

  // hooks
  const isMobile = useIsMobile();

  return (
    <Button
      variant="outline"
      size={isMobile ? "sm" : "default"}
      onClick={() => handlePromptClick()}
      disabled={!hasAvailablePrompts()}
    >
      <span>Prompt</span>
    </Button>
  );
}

export { PromptButton };
