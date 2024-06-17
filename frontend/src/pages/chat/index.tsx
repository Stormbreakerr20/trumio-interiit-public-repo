import Head from "next/head"
import React, { useEffect } from "react";
import Breadcrumbs from "~/components/Breadcrumbs"
import { CaretUpIcon } from '@radix-ui/react-icons'
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import MasterAI from "~/components/chat/Master";
import { api } from "~/utils/api";
import Loading from "~/components/Loading";
import Select from 'react-select';
import Updates from "~/components/chat/Updates";
import { subscribeToFirestore } from '~/firebase/utils'
import type { MasterAIChat, UpdateChat } from "~/components/chat/types";
import type { Prisma } from "@prisma/client";
import * as uuid from 'uuid'

export type ProjectWithGithubRepos = Prisma.ProjectGetPayload<{ include: { github_repos: true } }>



export default function ChatPage() {
  const [projectChat, setProjectChat] = useState<string>('Master AI');
  const [openPrivateChat, setOpenPrivateChat] = useState<boolean>(false);
  const [openProjectChat, setOpenProjectChat] = useState<boolean>(true);
  const [openGroupChat, setOpenGroupChat] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectWithGithubRepos | null>(null);

  const [masterAIChats, setMasterAIChats] = useState<MasterAIChat[]>([])
  const [updateChats, setUpdateChats] = useState<UpdateChat[]>([])

  const updateMutation = api.updates.getItems.useMutation()

  const askQueryMutation = api.master_ai.askMasterAi.useMutation()

  const ask_query = async (projectId: string, query: string) => {
    const res = await askQueryMutation.mutateAsync({ projectId, query })
    setMasterAIChats([...masterAIChats, { id: uuid.v4(), type: 'user', data: query, user: { name: '', profilePicture: '' }, created_at: new Date().toISOString() }, { id: uuid.v4(), type: 'system', data: res, user: { name: '', profilePicture: '' }, created_at: new Date().toISOString() }])
    console.log('A: ', res)
  }


  const { user } = useUser()

  const pushToMasterAI = (new_chat: MasterAIChat) => {
    setMasterAIChats([...masterAIChats, new_chat])
  }

  const pushToUpdates = (new_chat: UpdateChat) => {
    setUpdateChats([...updateChats, new_chat])
  }

  const getUpdates = async (selectedProject: ProjectWithGithubRepos) => {
    console.log(await updateMutation.mutateAsync({ projectId: selectedProject.id }))
  }

  useEffect(() => {
    if (selectedProject && user) {
      getUpdates(selectedProject).catch(() => console.error("Could not get updates."))
      return subscribeToFirestore(selectedProject.id, user?.id, pushToMasterAI, pushToUpdates)
    } else {
      setMasterAIChats([])
      setUpdateChats([])
    }
  }, [selectedProject, user])


  const { data: projects1, isLoading: isLoadingProjects } = api.project.getMyProjects.useQuery({})

  const projects = projects1?.projects
  return (
    <>
      <Head>
        <title>Trumio</title>
      </Head>
      <main className="py-2 px-8">
        <div className="mx-2">
          <Breadcrumbs paths={['Chats']} />
        </div>
        <div className="w-full my-4 text-gray-600 flex flex-row">
          <div className="w-[25%] flex flex-col gap-3">
            <div className="">Chats</div>

            <div className=" flex flex-row justify-between items-center p-5 bg-white rounded-2xl shadow-xl">
              <p className="flex font-semibold">Private Chats</p>
              <button
                onClick={() => { setOpenPrivateChat(!openPrivateChat) }}
                className={"outline-none scale-[200%] duration-100 ease-in cursor-pointer hover:bg-sky-400 hover:text-white rounded-full" + (openPrivateChat ? "" : " rotate-180")}
              >
                <CaretUpIcon className="scale-200" />
              </button>
            </div>

            <div className="p-5 bg-white rounded-2xl shadow-xl">
              {/* Heading */}
              <div className="flex flex-row justify-between items-center">
                <p className="flex font-semibold">Project Chats</p>
                <button
                  onClick={() => { setOpenProjectChat(!openProjectChat) }}
                  className={"outline-none scale-[200%] duration-100 ease-in cursor-pointer hover:bg-sky-400 hover:text-white rounded-full" + (openProjectChat ? "" : " rotate-180")}
                >
                  <CaretUpIcon className="scale-200" />
                </button>
              </div>

              {
                isLoadingProjects ?
                  <div className="flex justify-center mt-3">
                    <Loading className="w-4 h-4" />
                  </div> :
                  (projects?.length === 0) ? "No Projects Found" :
                    (!openProjectChat || !projects || projects?.length === 0) ? null :
                      <>

                        {/* Projects */}
                        <div className="px-4 my-2 transition-opacity duration-200 ease-in-out">
                          {
                            <Select onChange={(option) => { setSelectedProject(option ? option.value : null) }}
                              value={{ label: selectedProject?.project_name ?? "Select a project", value: selectedProject }}
                              placeholder={"Select a project"}
                              options={projects?.map((project) => ({ label: project.project_name, value: project }))}
                            />
                          }

                          {
                            selectedProject ?
                              <div className="mx-5 my-2 font-medium flex flex-col">
                                <button onClick={() => { setProjectChat('Master AI') }}
                                  className={`text-left px-3 py-1 border-l-2 ${projectChat === 'Master AI' ? 'border-sky-500 text-sky-500' : 'border-gray-300 text-gray-500'} `}>
                                  Master AI
                                </button>
                                <button onClick={() => { setProjectChat('Updates') }}
                                  className={`text-left px-3 py-1 border-l-2 ${projectChat === 'Updates' ? 'border-sky-500 text-sky-500' : 'border-gray-300 text-gray-500'}`}>
                                  Updates
                                </button>
                                <button onClick={() => { setProjectChat('Resource Sharing') }}
                                  className={`text-left px-3 py-1 border-l-2 ${projectChat === 'Resource Sharing' ? 'border-sky-500 text-sky-500' : 'border-gray-300 text-gray-500'}`}>
                                  Resource Sharing
                                </button>
                                <button onClick={() => { setProjectChat('Discussions') }}
                                  className={`text-left px-3 py-1 border-l-2 ${projectChat === 'Discussions' ? 'border-sky-500 text-sky-500' : 'border-gray-300 text-gray-500'}`}>
                                  Discussions
                                </button>
                                <button onClick={() => { setProjectChat('Payments') }}
                                  className={`text-left px-3 py-1 border-l-2 ${projectChat === 'Payments' ? 'border-sky-500 text-sky-500' : 'border-gray-300 text-gray-500'}`}>
                                  Payments
                                </button>
                              </div> : null
                          }
                        </div>
                      </>
              }

            </div>

            <div className=" flex flex-row justify-between items-center p-5 bg-white rounded-2xl shadow-xl">
              <p className="flex font-semibold">Group Chats</p>
              <button
                onClick={() => { setOpenGroupChat(!openGroupChat) }}
                className={"outline-none scale-[200%] duration-100 ease-in cursor-pointer hover:bg-sky-400 hover:text-white rounded-full" + (openGroupChat ? "" : " rotate-180")}
              >
                <CaretUpIcon className="scale-200" />
              </button>
            </div>

          </div>
          {
            selectedProject ?

              projectChat === 'Master AI' ? <MasterAI project={selectedProject} askQuery={ask_query} masterAIChats={masterAIChats} /> :
                projectChat === 'Updates' ? <Updates updates={updateMutation.data ?? []} project={selectedProject} /> :
                  projectChat === 'Resource Sharing' ? <div></div> :
                    projectChat === 'Discussions' ? <div></div> :
                      projectChat === 'Payments' ? <div></div> :
                        <div className="w-[75%] ml-4 mt-4 bg-white rounded-2xl shadow-xl"></div>
              :

              null
          }



        </div>
      </main>
    </>
  )
}
