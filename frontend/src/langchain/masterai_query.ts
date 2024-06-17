import { ChatOpenAI } from '@langchain/openai'
import { Chroma } from 'langchain/vectorstores/chroma'
import { HuggingFaceTransformersEmbeddings } from 'langchain/embeddings/hf_transformers'
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from 'langchain/prompts'
import { RunnablePassthrough, RunnableSequence } from 'langchain/schema/runnable'
import { formatDocumentsAsString } from 'langchain/util/document'
import { StringOutputParser } from 'langchain/schema/output_parser'
import type { Project } from '@prisma/client'
import type { MilestoneSchema } from '~/pages/create-bid/types'

const model = new ChatOpenAI({ maxTokens: -1, maxConcurrency: 1, maxRetries: 3 })
const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: "Xenova/all-MiniLM-L6-v2"
})



// export const add_context = async (projectId: string, context: string[]) => {
//   const vectorstore = await Chroma.fromDocuments(

//   )
// }


export const ask_query = async (project: Project, query: string) => {
  // const vectorstore = await Chroma.fromExistingCollection(
  //   embeddings,
  //   { collectionName: project.id }
  // )

  // const vectorstoreretreival = vectorstore.asRetriever()

  const messages = [
    SystemMessagePromptTemplate.fromTemplate(
      `
        You are AI assistant for Trumio Platform. Trumio is a online platform which enables companies to hire univeristy student talent for industrial research projects.
        AI assistant is given the relavant context for a query in a Trumio project and uses his reasoning based on the given context and his understanding in software development to answer a user's query.
        Project context contains the project's name, detailed description.
        Project Context may additionally contain other relavant data or event from the project which includes relavant code files from the github repository, chunks of transcript of meeting between the client and talent team, or conversations between team members.
        AI Assistant only takes true information from the given context and produces the most useful, concise response to a user's query.
        AI Assistant can fail to answer the query if the provided context is not sufficient and provide a response which informs the user that the answer is uncertain and asks for a more specific question or reframe the question.
  
        PROJECT CONTEXT BLOCK STARTS
        Project name: ${project.project_name}
        Project Description: ${project.description}
        
        
        PROJECT CONTEXT BLOCK ENDS
      `
    ),
    HumanMessagePromptTemplate.fromTemplate(
      `{query}`
    )
  ]
  
  const prompt = ChatPromptTemplate.fromMessages(messages)

  const chain = RunnableSequence.from([
    {
      // context: vectorstoreretreival.pipe(formatDocumentsAsString),
      query: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser()
  ])

  const answer = await chain.invoke(query)
  console.log(answer)

  return answer
  
}