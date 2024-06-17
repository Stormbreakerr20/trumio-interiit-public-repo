import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getUser: privateProcedure
    .input(z.object({}).nullish())
    .query(async ({ ctx: { db, userId } }) => {
      console.log(userId)

      const user = await db.user.upsert({
        where: { id: userId },
        update: {},
        create: {
          id: userId
        },
        include: {
          bids:true
        }
      });
      // TODO: create user in messaging websocket with messaging_password
      return user
    }),

  updateUserRole: privateProcedure
    .input(z.object({text: z.enum(["client", "talent"])}))
    .mutation(async ({ ctx: { db, userId },input }) => {
      const user = await db.user.update({
        where: { id: userId },
        data:{
          role: input.text
        }
      });
      return user
    }),

  updateTalentProfile: privateProcedure
    .input(z.object({
      tagline: z.string(),
      workExperience: z.number(),
      introduction: z.string(),
      job_title: z.string()
    }))
    .mutation(async ({ ctx: { db, userId }, input }) => {
      const user = await db.user.update({
        where: { id: userId },
        data: {
        }
      })
    })

});