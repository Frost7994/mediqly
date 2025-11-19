import { cache } from "react";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import "server-only";

// <-- ensure this file cannot be imported from the client

import { createTRPCContext } from "@/lib/trpc/init";
import { makeQueryClient } from "@/lib/trpc/query-client";
import { appRouter } from "@/lib/trpc/routers/_app";

const getQueryClient = cache(makeQueryClient);
const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export { getQueryClient, trpc };
