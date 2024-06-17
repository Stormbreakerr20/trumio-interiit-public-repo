import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ask_query } from "~/langchain/masterai_query";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const masterAiRouter = createTRPCRouter({
  getItems: privateProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx: { userId, db }, input }) => {
      return await db.masterAIChats.findMany({
        where: {
          projectId: input.projectId,
          OR: [
            {
              userId: null,
            },
            {
              userId: userId
            }
          ]
        }
      })
    }),
  
  askMasterAi: privateProcedure
    .input(z.object({ projectId: z.string(), query: z.string() }))
    .mutation(async ({ ctx: { userId, db }, input }) => {
      const project = await db.project.findUnique({
        where: {
          id: input.projectId
        }
      })
      if(!project) throw new TRPCError({ code: 'BAD_REQUEST', message: 'No Such project found.' })
      return await ask_query(project, input.query)
    })
})