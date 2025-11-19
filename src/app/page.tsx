"use client";

import { toast } from "@/utils";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Page, PageContent, PageDescription, PageHeader, PageTitle } from "@/components/ui/page";

import { signIn, signOut, signUp, useSession } from "@/lib/auth/client";

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
                      fetchOptions: {
                        onSuccess: () => {
                          toast({ message: "Successfully signed in! Redirecting.." });
                          //+ TODO: push the user here
                        },
                        onError: (ctx) => {
                          toast({ message: ctx.error.message });
                        },
                      },
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
                      fetchOptions: {
                        onSuccess: () => {
                          toast({ message: "Successfully signed up! Redirecting.." });
                          //+ TODO: push the user here
                        },
                        onError: (ctx) => {
                          toast({ message: ctx.error.message });
                        },
                      },
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
                await signOut({
                  fetchOptions: {
                    onError: (ctx) => {
                      toast({ message: ctx.error.message });
                    },
                    onSuccess: () => {
                      toast({ message: "Successfully signed out! Redirecting.." });
                    },
                  },
                });
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
