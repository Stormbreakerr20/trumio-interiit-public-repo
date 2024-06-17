import {
  ChatBubbleIcon,
  ExclamationTriangleIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import { CodeIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Button,
  Popover,
  TextField,
  Callout,
} from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import type { ProjectWithGithubRepos } from "~/pages/chat";
import type { MasterAIChat, UpdateChat } from "./types";
import { DateTime } from 'luxon'
import Loading from "../Loading";

interface MasterAIProps {
  project: ProjectWithGithubRepos,
  masterAIChats: MasterAIChat[],
  askQuery: (projectId: string, query: string) => Promise<void>,
}

export default function MasterAI({ project, masterAIChats, askQuery }: MasterAIProps) {
  const [githubInput, setGithubInput] = useState<string>("");
  const { isLoading, mutate, error } = api.project.addGithubRepo.useMutation();

  const [query, setQuery] = useState<string>("")

  function extractUsernameAndRepo(url: string) {
    const parts = url.split("/");

    const username = parts[parts.length - 2];
    const repo = parts[parts.length - 1];

    return { username, repo };
  }

  const handleSubmit = () => {
    const { username, repo } = extractUsernameAndRepo(githubInput);
    try {
      const result = mutate({
        username: username,
        repo: repo,
        projectId: project.id,
      });
    } catch (error) {
      console.error("Error creating bid:", error);
    }
  };

  return (
    <>
      <div className="ml-4 mt-4 w-[75%] rounded-2xl bg-white shadow-xl h-[80vh] relative">
        <div className="flex h-[80px] w-full flex-col justify-center border-b border-gray-200 px-4 py-2">
          <div className="flex flex-row items-center justify-between gap-3">
            <div className="flex flex-row items-center gap-3">
              <div className="rounded-full bg-sky-600 p-4">
                <ChatBubbleIcon className="scale-[150%] text-white"></ChatBubbleIcon>
              </div>
              <div className="my-auto flex flex-col">
                <div className="font-semibold">Master AI</div>
                <div className="text-xs">{project.project_name}</div>
              </div>
            </div>
            <div className="mr-3 flex h-full flex-row items-center gap-3">
              <Popover.Root>
                <Popover.Trigger>
                  <Button
                    className="cursor-pointer rounded-full bg-slate-400 p-3 text-white"
                    variant="soft"
                  >
                    <CodeIcon className="scale-[150%]" />
                  </Button>
                </Popover.Trigger>
                <Popover.Content style={{ width: 360 }}>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-xs">
                      Add context to Master AI by connecting your Github
                      Repository.
                    </h1>
                    <div className="mb-4">
                      {project.github_repos.map((data) => {
                        return (
                            <TextField.Root key={data.id}>
                              <TextField.Slot>
                                <GitHubLogoIcon />
                              </TextField.Slot>
                              <TextField.Input
                                disabled={true}
                                value={`${data.username}/${data.repo}`}
                              />
                            </TextField.Root>
                        );
                      })}
                    </div>
                    {error && (
                      <Callout.Root
                        id="error-call"
                        color="red"
                        role="alert"
                        className="flex h-[30px] items-center"
                      >
                        <Callout.Icon>
                          <ExclamationTriangleIcon />
                        </Callout.Icon>
                        <Callout.Text>{error.message}</Callout.Text>
                      </Callout.Root>
                    )}
                    <TextField.Root>
                      <TextField.Slot>
                        <GitHubLogoIcon />
                      </TextField.Slot>
                      <TextField.Input
                        disabled={isLoading}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          setGithubInput(event.target.value);
                        }}
                        placeholder="Paste Repo URL..."
                      />
                    </TextField.Root>
                    <Button
                      variant="solid"
                      color="blue"
                      onClick={handleSubmit}
                      className="h-[30px] cursor-pointer"
                    >
                      {isLoading ? (
                        <svg
                          className="scale-[200%] stroke-white"
                          width="9"
                          height="9"
                          viewBox="0 0 25 25"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="9.5"
                              fill="none"
                              strokeWidth="3"
                              strokeLinecap="round"
                            >
                              <animate
                                attributeName="stroke-dasharray"
                                dur="1.5s"
                                calcMode="spline"
                                values="0 150;42 150;42 150;42 150"
                                keyTimes="0;0.475;0.95;1"
                                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="stroke-dashoffset"
                                dur="1.5s"
                                calcMode="spline"
                                values="0;-16;-59;-59"
                                keyTimes="0;0.475;0.95;1"
                                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                                repeatCount="indefinite"
                              />
                            </circle>
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              dur="2s"
                              values="0 12 12;360 12 12"
                              repeatCount="indefinite"
                            />
                          </g>
                        </svg>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </Popover.Content>
              </Popover.Root>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 flex flex-col flex-grow w-full max-h-[100%]">
          <div className="flex flex-col flex-grow gap-3 h-full w-full px-10 overflow-auto mt-[75px]">
            {

              masterAIChats.map((el: MasterAIChat) => ({ ...el, created_at: DateTime.fromISO(el.created_at) }))
              .map((el, index, arr) => {
                const showDate = index === 0 || (
                  !el.created_at.hasSame(arr[index-1]?.created_at, 'day')
                )
                return (
                  <PromptWrapper key={el.id} el={el} showDate={ showDate } />
                )
              }
              )
            }
          </div>
          <div className=" w-full order-t border-slate-300 flex flex-row px-5 py-4 gap-4">
            <textarea value={query} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setQuery((e.target as HTMLTextAreaElement).value) }} 
              placeholder="Type a question here." name="" id="" rows={1} className="text-lg bg-sky-200 bg-opacity-20 outline-none p-2 flex flex-grow resize-none rounded-lg border border-sky-500 font-medium text-">

            </textarea>
            <div className="flex justify-center items-center px-4 bg-sky-400 text-white rounded-lg cursor-pointer"
              onClick={() => { askQuery(project.id, query).catch(err => console.error("Could not ask: ", JSON.stringify(err))).finally(() => { setQuery("") }) }}
            >
              Ask
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const PromptWrapper = ({ el, showDate }: { el: Omit<MasterAIChat, 'created_at'> & { created_at: DateTime }, showDate: boolean }) => {
  return (
    <div>
      {
        showDate ? 
        <div className="flex flex-grow items-center justify-center border-b border-gray-400 my-3">
          { el.created_at ? el.created_at.toLocaleString(DateTime.DATE_MED) : 'Invalid Date' }
        </div> : null
      }
      {
        el.type === 'user' ? <UserPrompt key={el.id} prompt={el.data} /> :
        el.type === 'system' ? <SystemPrompt key={el.id} prompt={el.data} /> : 
        el.type === 'resource' ? <ResourcePrompt key={el.id} prompt={el.data} user={el.user} /> : 
        el.type === 'milestone' ? <MilestonePrompt key={el.id} prompt={el.data} /> : 
        el.type === 'payment' ? <PaymentPrompt key={el.id} prompt={el.data} user={el.user} /> : 
        null
      }
    </div>
  )
}

const UserPrompt = ({ prompt }: { prompt: string, }) => {
  return (
    <div className="flex flex-grow flex-col self-end">
      <div className=" bg-sky-500 max-w-[60%] rounded-lg text-white p-2 font-medium self-start">
        { prompt }
      </div>
    </div>
  )
}

const SystemPrompt = ({ prompt }: { prompt: string, }) => {
  return (
    <div className="flex flex-col flex-grow ml-auto self-end">
      <div className="bg-slate-400 rounded-lg max-w-[60%] text-white p-2 font-medium self-end">
        { prompt }
      </div>
    </div>
  )
}

const ResourcePrompt = ({ prompt, user,  }: { prompt: string, user: { name: string, profilePicture: string }, }) => {
  return (
    <div className="flex gap-2 self-center justify-center items-center max-w-[60%] font-medium">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={user.profilePicture || "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=826"} alt="" width={40} height={40} />
      <div>
        { user.name }
      </div>
      <div>-</div>
      <div className="p-2 text-sky-500 underline">
        { prompt }
      </div>
    </div>
  )
}

const MilestonePrompt = ({ prompt }: { prompt: string, }) => {
  return (
    <div className="flex justify-center gap-3 items-center max-w-[60%] self-center">
      <StarFilledIcon className="scale-[1.15]" />
      <div className="font-medium flex items-center">
        { prompt }
      </div>
    </div>
  )
}

const PaymentPrompt = ({ prompt, user, }: { prompt: string, user: { name: string, profilePicture: string }, }) => {
  return (
    <div className="flex gap-2 self-center justify-center items-center max-w-[60%] font-medium">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={user.profilePicture || "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=826"} alt="" width={40} height={40} />
      <div>
        { user.name }
      </div>
      <div>-</div>
      <div className="p-2 underline text-gray-600">
        { prompt }
      </div>
    </div>
  )
}
