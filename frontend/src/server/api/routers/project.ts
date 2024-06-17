import { z } from "zod";
import { TRPCError } from "@trpc/server";
import type { User } from "@clerk/nextjs/server";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
import * as uuid from 'uuid'
import { getMilestones } from "~/langchain/milestone";

export const projectRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getProjects: privateProcedure
    .input(z.object({}).nullish())
    .query(async ({ ctx: { userId, db } }) => {
      return await db.project.findMany();
    }),
  
  getProject: privateProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx: { userId, db }, input: { projectId }}) => {
      return await db.project.findUnique({
        where: {
          id: projectId
        }
      });
    }),

  getMyProjects: privateProcedure
    .input(z.object({}).nullish())
    .query(async ({ ctx: { userId, db } }) => {
      const projects = await db.project.findMany({
        where: {
          team_members: {
            some: {
              id: userId,
            },
          },
        },
        include: {
          github_repos: true,
          team_members: {
            select: {
              id: true,
              role: true
            }
          }
        }
      });

      const users = new Map<string, User>()

      await Promise.all(projects.map(async (project) => {
        await Promise.all(project.team_members.map(async (user) => {
          if(!users.get(user.id)) {
            users.set(user.id, await clerkClient.users.getUser(user.id))
          }
        }))
      }))

      return {projects, users}
      
    }),

  createBid: privateProcedure
    .input(
      z.object({
        bid_data: z.object({
          milestones: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              description: z.string(),
              duration: z.number(),
              cost: z.number(),
              deliverables: z.array(
                z.object({
                  id: z.string(),
                  text: z.string()
                })
              )
            })
          ),
          start_date: z.date(),
        }),
        projectId:z.string()
      }),
    )
    .mutation(async ({ ctx: { userId, db }, input }) => {
      const bid_data = input.bid_data;
      try {
        await db.bid.create({
          data : {
            bid_data:bid_data,
            projectId:input.projectId,
            userId:userId
          }
        });
      } catch (error) {
        console.error("Error creating/updating bid:", error);
        throw new Error("Failed to create/update bid");
      }
    }),

  addGithubRepo: privateProcedure
    .input(
      z.object({
        repo: z.string().optional(),
        username: z.string().optional(),
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { db }, input }) => {
      const username = input.username;
      const repo = input.repo;

        // const res = await fetch();

      if (username && repo) {
        const github_repo = await db.githubRepos.findFirst({
          where: {
            projectId: input.projectId,
            username, repo
          },
          select:{
            username:true
          }
        });
        if(!github_repo) {
          await db.githubRepos.create({
            data : {
              projectId: input.projectId,
              username,
              repo,
            }
          });
        } else {
          throw new TRPCError({code: "BAD_REQUEST" ,message: "This repository is already linked."})
        }
      } else {
        throw new TRPCError({code: "BAD_REQUEST", message: "Github URL seems invalid."})
      }
      
    }),
    createProject: privateProcedure
      .input(z.object({
        project_name: z.string(),
        duration: z.number(),
        duration_unit: z.string(),
        description: z.string(),
        timezone: z.string(),
        timeOverlap: z.number(),
        weekdays: z.boolean(),
        weekends: z.boolean(),
        weekdayStartHour: z.number(),
        weekdayEndHour: z.number(),
        weekendStartHour: z.number(),
        weekendEndHour: z.number(),
        workingWeekdays: z.object({
          mon: z.boolean(),
          tue: z.boolean(),
          wed: z.boolean(),
          thu: z.boolean(),
          fri: z.boolean(),
        }),
        workingWeekends: z.object({
          sat: z.boolean(),
          sun: z.boolean()
        }),
        skills: z.array(
          z.object({
            _id: z.string(),
            name: z.string()
          })
        ),
        tools: z.array(
          z.object({
            _id: z.string(),
            name: z.string()
          })
        ),
        countries: z.array(z.string()),
        isIncluding: z.boolean(),
        nda: z.boolean(),
      }))
      .mutation(async ({ ctx: { db, userId }, input }) => {
        const project = await db.project.create({
          data: {
            ...input,
            team_members: {
              connect: [ { id: userId } ]
            }
          }
        })
        return project
      }),

    getBids: privateProcedure
      .input(z.object({projectId: z.string() }))
      .query(async ({ctx: { db, userId }, input}) => {
        const project = await db.project.findUnique({
          where: {
            id: input.projectId,
          },
          include: {
            bids: {
              select: {
                userId: true
              }
            }
          }
        })
        if(!project) {
          return new TRPCError({'code': 'BAD_REQUEST', 'message': 'No such project exists.'})
        }
        const users = new Map<string, User>()
        await Promise.all(project.bids.map(async bid => {
          if(!users.get(bid.userId)) {
            users.set(userId, await clerkClient.users.getUser(bid.userId))
          }
        }))

        return { users, bids: project.bids, project }
      }),
    
    accept_bid: privateProcedure
      .input(z.object({ projectId: z.string(), bidUserId: z.string()  }))
      .mutation(async ({ctx: {db, userId}, input}) => {
        await db.project.update({
          where: {
            id: input.projectId
          },
          data: {
            team_members: {
              connect: {
                id: input.bidUserId
              }
            }
          }
        })
      }),

      getMilestones: privateProcedure
      .input(z.object({ projectId: z.string() }))
      .mutation(async ({ctx: {db, userId}, input}) => {
        const project = await db.project.findUnique({
          where: {
            id: input.projectId
          }
        })
        if(!project) {
          return new TRPCError({'code': 'BAD_REQUEST', 'message': 'No such project exists.'})
        } 

        const user = await db.user.findUnique({
          where: {
            id: userId
          },
        })
        if(!user) {
          return new TRPCError({'code': 'BAD_REQUEST', 'message': 'No such user exists.'})
        }

        const result = await getMilestones(project, user)

        if(!result){
          return new TRPCError({'code': 'BAD_REQUEST', 'message': 'Error generating milestones.'})
        }
        if(result.success) {
          return result.data
          .map((mile) => ({ id: uuid.v4(), ...mile }))
          .map((mile) => ({ ...mile, deliverables: mile.deliverables.map((del) => ({ id: uuid.v4(), text: del })) }))
        } else {
          return new TRPCError({'code': 'BAD_REQUEST', 'message': result.data})
        }
      }),

});
