import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Page, PageContent, PageDescription, PageHeader, PageTitle } from "@/components/ui/page";

// meta
export const metadata: Metadata = {
  title: "Mediqly | home",
};

export default function HomePage() {
  return (
    <Page>
      <PageHeader className="border-b">
        <Container>
          <PageTitle>Home Page</PageTitle>
          <PageDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima unde optio ipsum.
          </PageDescription>
        </Container>
      </PageHeader>
      <PageContent>
        <Container>
          <p>This is the content of the home page.</p>
        </Container>
      </PageContent>
    </Page>
  );
}
