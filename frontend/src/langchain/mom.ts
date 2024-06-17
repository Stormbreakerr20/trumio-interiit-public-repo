import { PromptTemplate } from "langchain/prompts";
import { RunnableSequence } from "langchain/schema/runnable";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const prompt = PromptTemplate.fromTemplate(
    `
    You are AI Assistant. AI Assistant is qualified in understanding transcript of a meeting in different languages.
    AI Assistant is hired by a client to understand the transcript of a meeting and provide Minutes of Meeting.
    Minutes of Meeting consists of the three things: Agenda of the meeting, key points discussed in the meeting and action items to be taken.
    AI Assistant uses his knowledge to provide Minutes of Meeting to the client without any errors.

    AI Assistant is given a transcript of a meeting in English.

    START CONTEXT BLOCK
    Transcript of a meeting:
    {transcript}
    END CONTEXT BLOCK

    {format_instructions}
    Generate Minutes of Meeting for the meeting as per the instructions as best as possible.

    `
)

const parser = StructuredOutputParser.fromZodSchema(
    z.array(
        z.object({
            agenda: z.string().describe("Agenda of the meeting"),
            key_points: z.array(z.string()).describe("Key points discussed in the meeting"),
            action_items: z.array(z.string()).describe("Action items to be taken")
        }).describe("Object containing contents of each Minutes of Meeting")
    ).describe("Array containing all the Minutes of Meeting for the meeting")
    )


const chain = RunnableSequence.from([
    prompt,
    new OpenAI({maxTokens:-1, maxRetries: 3}),
    parser
])

export interface MomData {
    agenda: string,
    key_points: string[],
    action_items: string[]
}


export const getMoM = async (transcript: string): Promise<{ success: true, data: MomData[] } | { success: false, data: string }> => {
    try {
        const result = await chain.invoke({ transcript: transcript, format_instructions: parser.getFormatInstructions() })
        return { success: true, data: result }
    } catch (e: unknown) {
        if (e instanceof Error) {
            return { success: false, data: e.message }
        } else {
            return { success: false, data: "Unknown error" }
        }
    }
}