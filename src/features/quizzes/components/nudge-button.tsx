"use client";

import { NO_OF_NUDGES, NUDGE } from "@/constants";
import { useIsMobile } from "@/hooks";

import { Button } from "@/components/ui/button";

import { useQuizStore } from "@/features/quizzes/stores";

function NudgeButton() {
  // store state
  const hints = useQuizStore((state) => state.hints);

  // store actions
  const handleNudgeClick = useQuizStore((state) => state.handleNudgeClick);

  // helps
  const hasAvailableNudges = () => {
    return hints.filter((hint) => hint.type === NUDGE).length < NO_OF_NUDGES;
  };

  // hooks
  const isMobile = useIsMobile();

  return (
    <Button
      variant="outline"
      size={isMobile ? "sm" : "default"}
      onClick={() => handleNudgeClick()}
      disabled={!hasAvailableNudges()}
    >
      <span>Nudge</span>
    </Button>
  );
}

export { NudgeButton };
