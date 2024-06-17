import { PromptTemplate } from 'langchain/prompts'
import { RunnableSequence } from 'langchain/schema/runnable'
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from 'zod';
import type { Project, User } from '@prisma/client';

const prompt = PromptTemplate.fromTemplate(
  `
    You are AI Assistant. AI assistant is qualified in software developement in many different frameworks and programming languages.
    AI assistant is hired by a client to complete a software project with the help of his team.
    AI Assistant uses his knowledge to provide a approach to best achieve a project's objective.
    AI assistant is very specific in his approach and is able to plan the work according to his team's experience and programming knowledge by setting milestones.
    Milestones consists of the three things: details about the milestone includingTitle, description, deliverable of the work done in the milestone, Expected duration of the milestone and the cost to the client for the work done during each milestone.
    AI assistant can take reference from the client's programming language and tools preference but prioritizes a technology his team is comfortable to work in.
    AI assistant can also predict the cost it would charge to a client for each milestone.

    START CONTEXT BLOCK
    Details provided by the client:
      Project Name: {name}
      Project Description: {description}
      Project Expected Duration: {duration}
      Skills Suggested by the Client: {skills}
      Tools suggested by the Client: {tools}
      No. of hours requested by Client per week: {hours}
    
    Details about the AI assistant team member:
      Skills preferred by the team: {team_skills}
      Tools preferred by the team: {team_tools}
      No of working hours per week: {team_hours}
      Experience in software developement: {team_experience}
      Certificates of the Team member: {team_certificates}

    END CONTEXT BLOCK

    {format_instructions}
    Generate milestones for the project as per the instructions as best as possible.
  `
)

const parser = StructuredOutputParser.fromZodSchema(
  z.array(
    z.object({
      name: z.string().describe("Title of the milestone"),
      description: z.string().describe("Description of the work done in the milestone. Should be specific."),
      deliverables: z.array(
        z.string().describe("Component of the project to be submitted and verified to assess the completion of the deliverable"),
      ).describe('List of deliverables to be submitted for completion of the milestone'),
      cost: z.number().describe("Charge to client in USD for successful completion of the milestone. Should be based as per typical experienced freelancer rates"),
      duration: z.number().describe("Expected time in weeks required to complete the milestone"),
    }).describe("Object containing contents of each milestone")
  ).describe("Array containing all the milestones for the project")
)

const chain = RunnableSequence.from([
  prompt,
  new OpenAI({ maxTokens: 1000  }),
  parser
])

interface skillsType {
  _id: string,
  name: string
}

interface toolsType {
  _id: string,
  name: string
}

interface CertificatesType {
  _id: string,
  name: string
}

interface MilestoneData {
  name: string,
  description: string,
  deliverables: string[],
  cost: number,
  duration: number
}


export const getMilestones = async (
  project: Project,
  user: User,
): Promise<{success: true, data: MilestoneData[] } | {success: false, data: string}> => {
  try {
    const res = await chain.invoke({
      format_instructions: parser.getFormatInstructions(),
      name: project.project_name,
      description: project.description,
      duration: `${project.duration} ${project.duration_unit}`,
      skills: ((project.skills as unknown[]) as skillsType[]).map((skill) => skill.name).join(", "),
      tools: ((project.tools as unknown[]) as toolsType[]).map((tool) => tool.name).join(", "),
      hours: `${(project.weekdays ? project.weekdayEndHour - project.weekdayStartHour : 0) + (project.weekends ? project.weekendEndHour - project.weekdayStartHour : 0)} hours`,
      team_skills: ((user.skills as unknown[]) as skillsType[]).map((skill) => skill.name).join(", "),
      team_tools: ((user.tools as unknown[]) as toolsType[]).map((tool) => tool.name).join(", "),
      team_hours: `${(user.weekdays ? user.weekdayEndHour - user.weekdayStartHour : 0) + (user.weekends ? user.weekendEndHour - user.weekdayStartHour : 0)} hours`,
      team_experience: `${user.talent_work_experience} Months`,
      team_certificates: ((user.talent_certificates as unknown[]) as CertificatesType[]).map((certificate) => certificate.name).join(", "),
    })
    return { success: true, data: res }
  } catch(e: unknown) {
    if (typeof e === "string") {
      return { success: false, data: e.toUpperCase() } // works, `e` narrowed to string
  } else if (e instanceof Error) {
      return { success: false, data: e.message } // works, `e` narrowed to Error
  } else {
      return { success: false, data: "UNKNOWN ERROR" } // fails, `e` still `unknown`
  }
}
}