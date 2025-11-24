import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Page, PageContent, PageDescription, PageHeader, PageTitle } from "@/components/ui/page";

import { MockQuizSetupForm } from "@/features/quizzes/components/mock-quiz-setup-form";

// meta
export const metadata: Metadata = {
  title: "Mediqly | Quiz Setup",
};

export default function SetupPage() {
  return (
    <Page>
      <PageHeader className="border-b">
        <Container>
          <PageTitle>Quiz Setup Page</PageTitle>
          <PageDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima unde optio ipsum.
          </PageDescription>
        </Container>
      </PageHeader>
      <PageContent>
        <Container>
          <div className="mx-auto max-w-xl">
            <MockQuizSetupForm />
          </div>
        </Container>
      </PageContent>
    </Page>
  );
}
