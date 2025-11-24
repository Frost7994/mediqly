"use client";

import { toast } from "@/utils";
import { BetterFetchOption } from "better-auth/react";

const signUpFetchOptions: BetterFetchOption = {
  onError: (ctx) => {
    toast({ message: ctx.error.message });
  },
  onSuccess: () => {
    toast({ message: "Successfully signed up! Redirecting.." });
    //+ TODO: push the user here
  },
};

const signInFetchOptions: BetterFetchOption = {
  onError: (ctx) => {
    toast({ message: ctx.error.message });
  },
  onSuccess: () => {
    toast({ message: "Successfully signed in! Redirecting.." });
    //+ TODO: push the user here
  },
};

const signOutFetchOptions: BetterFetchOption = {
  onError: (ctx) => {
    toast({ message: ctx.error.message });
  },
  onSuccess: () => {
    toast({ message: "Successfully signed out! Redirecting.." });
  },
};

export { signInFetchOptions, signOutFetchOptions, signUpFetchOptions };
