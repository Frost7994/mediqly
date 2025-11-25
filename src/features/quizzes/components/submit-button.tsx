"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAppForm, useIsMobile } from "@/hooks";
import { sleep, toast } from "@/utils";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function SubmitButton() {
  // local state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // router destructure
  const { push } = useRouter();

  // form methods
  const form = useAppForm({
    defaultValues: {},
    validators: {
      onSubmit: z.object({}),
    },
    onSubmit: async ({ value }) => {
      // simulate form submission
      await sleep({ ms: 800 });

      // show toast
      toast({ message: "Quiz Submitted! Redirecting..." });

      //+ TODO: Submit quiz data to the database

      //  close the dialog
      setIsOpen(false);

      //+ TODO: redirect user to results page
      // push(`/quiz/results/${resultId}`);
    },
  });

  // hooks
  const isMobile = useIsMobile();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={isMobile ? "sm" : "default"}>Submit Quiz</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to submit the quiz?</DialogTitle>
          <DialogDescription>
            Once submitted, you will not be able to change your answers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <form.AppForm>
              <form.SubmitButton>Submit</form.SubmitButton>
            </form.AppForm>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { SubmitButton };
