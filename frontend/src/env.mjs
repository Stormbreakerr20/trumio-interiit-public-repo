import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_MYSQL_URL_HERE"),
        "You forgot to change the default URL"
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    CLERK_SECRET_KEY: z.string(),
    NEXT_PUBLIC_CHAT_SOCKET_CONNECT: z.string(),
    AI_URL: z.string(),
    CHROMA_URL: z.string()
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid eCLERK_SECRET_KEYnv vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_CHAT_SOCKET_CONNECT: z.string(),
    NEXT_PUBLIC_PUBLIC_VAPID_KEY: z.string(),
    NEXT_PUBLIC_MESSAGES_COUNT_TO_PRELOAD: z.string()
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CHAT_SOCKET_CONNECT: process.env.NEXT_PUBLIC_CHAT_SOCKET_CONNECT,
    NEXT_PUBLIC_PUBLIC_VAPID_KEY: process.env.NEXT_PUBLIC_PUBLIC_VAPID_KEY,
    NEXT_PUBLIC_MESSAGES_COUNT_TO_PRELOAD: process.env.NEXT_PUBLIC_MESSAGES_COUNT_TO_PRELOAD,
    AI_URL: process.env.AI_URL,
    CHROMA_URL: process.env.CHROMA_URL
    // NEXT_PUBLIC_CLIENTVAR: process,.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
