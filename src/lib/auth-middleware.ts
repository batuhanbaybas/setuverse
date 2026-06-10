import { createMiddleware } from "@tanstack/react-start";
import { getSession } from "@/lib/auth-client";
import { getHeaders } from "better-auth/react";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const { data: session } = await getSession({
    fetchOptions: {
      headers: await getHeaders(),
    },
  });
  return await next({
    context: {
      user: session?.user,
    },
  });
});