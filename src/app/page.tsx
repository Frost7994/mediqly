"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Page, PageContent, PageDescription, PageHeader, PageTitle } from "@/components/ui/page";

import { signIn, signOut, signUp, useSession } from "@/lib/auth/client";
import {
  signInFetchOptions,
  signOutFetchOptions,
  signUpFetchOptions,
} from "@/lib/auth/fetch-options";

export default function HomePage() {
  // session destructure
  const { data: session } = useSession();

  if (!session)
    return (
      <Page>
        <PageHeader className="border-b">
          <Container>
            <PageTitle>Welcome to Our Application</PageTitle>
            <PageDescription>
              Please log in to access your dashboard and manage your account.
            </PageDescription>
          </Container>
        </PageHeader>
        <PageContent>
          <Container>
            <div className="space-y-4">
              <p>You are not logged in. Please log in to continue.</p>
              <div className="space-x-2">
                <Button
                  onClick={async () => {
                    await signIn.email({
                      email: "johndoe@example.com",
                      password: "Password1234!",
                      fetchOptions: signInFetchOptions,
                    });
                  }}
                >
                  Sign in
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    await signUp.email({
                      name: "John Doe",
                      email: "johndoe@example.com",
                      password: "Password1234!",
                      fetchOptions: signUpFetchOptions,
                    });
                  }}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </Container>
        </PageContent>
      </Page>
    );

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
          <div className="space-y-4">
            <p>Welcome back, {session.user.name}!</p>
            <Button
              onClick={async () => {
                await signOut({ fetchOptions: signOutFetchOptions });
              }}
            >
              Sign out
            </Button>
          </div>
        </Container>
      </PageContent>
    </Page>
  );
}
