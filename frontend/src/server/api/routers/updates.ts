import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { Turret_Road } from "next/font/google";
import { z } from "zod";
import { getMoM } from "~/langchain/mom";
import type { UpdateChat } from "~/components/chat/types";

import {
  createTRPCRouter,
  privateProcedure,
} from "~/server/api/trpc";

export const updateRouter = createTRPCRouter({
  getItems: privateProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx: { userId, db }, input }) => {
      const updates = await db.updates.findMany({
        where: {
          projectId: input.projectId,
        },
        select: {
          id: true,
          userId: true,
          agenda: true,
          key_items: true,
          action_items: true,
          action_items_status: true,
          meeting_name: true
        },
      })
      const processedUpdates = new Map<string, {id: string, agenda: string, action_items: { text: string, completed: boolean }[], key_points: string[] }[]>()
      updates.forEach((update) => {
        const val = { id: update.id, agenda: update.agenda, key_points: update.key_items, action_items: update.action_items.map((action, index) => ({ text: action, completed: update.action_items_status[index] ?? false })) }
        if(processedUpdates.has(update.meeting_name)) {
          processedUpdates.get(update.meeting_name)?.push(val)
        } else {
          processedUpdates.set(update.meeting_name, [val])
        }
      })

      const ans: UpdateChat[] = [] 
      processedUpdates.forEach((value, key) => ans.push({meeting_name: key, data: value}))
      return ans
    }),
  

  getMOM: privateProcedure
    .input(z.object({ transcript: z.string(), meeting_name: z.string(), projectId: z.string() }))
    .mutation(async ({ctx: {db, userId}, input}) => {
      const result = await getMoM(input.transcript)
      
      if(!result){
        return new TRPCError({'code': 'BAD_REQUEST', 'message': 'Error generating milestones.'})
      }
      if(result.success) {
        // Insert Updates to the database
        await db.updates.createMany({
          data: result.data.map((ag) => ({
            projectId: input.projectId,
            userId: userId,
            meeting_name: input.meeting_name,
            agenda: ag.agenda,
            key_items: ag.key_points,
            action_items: ag.action_items,
            action_items_status: ag.action_items.map(() => false)
          }))
        })
        return result.data
      } else {
        return new TRPCError({'code': 'BAD_REQUEST', 'message': result.data})
      }
      
    })
  
  // create_minutes: privateProcedure
  //   .input(z.object({ text: z.string() }))
  //   .mutation(async ({ ctx: { userId, db }, input }) => {

  //   })
})