import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import RightIcon from "~/components/icons/RightIcon";
import { useState } from "react";
import InlineForm from "../../components/project/InlineForm";
import { useProjectStore } from "../../store/ProjectStore";
import { api } from "~/utils/api";
import Image from "next/image";
import { GithubRepos, Project, User } from "@prisma/client";
import HeartIcon from "~/components/icons/HeartIcon";
import StarIcon from "~/components/icons/StarIcon";
import { Avatar } from "@radix-ui/themes";
import Loading from "~/components/Loading";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const mont = Montserrat({ subsets: ["latin"] });

enum ProjectsEnum {
  ONGOING = "Ongoing",
  UPCOMING = "Upcoming",
  COMPLETED = "Completed",
  DISPUTED = "Disputed",
  TERMINATED = "Terminated",
}

export default function Project() {
  const { data, isLoading } = api.project.getMyProjects.useQuery();

  const [selectedStatus, setSelectedStatus] = useState<ProjectsEnum>(
    ProjectsEnum.ONGOING,
  );

  const [modal, setModal] = useState(false);

  const handleClick = (val: ProjectsEnum) => {
    setSelectedStatus(val);
  };
  const [currentProj,setCurrentProj] = useState<Project>()

  return (
    <>
      <div className="flex min-h-[100vh] bg-[#f8f8f8]">
        <div className="flex w-[100%] flex-col gap-5 p-5">
          <div className="ml-3 flex items-center gap-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0578FB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="mb-25"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </span>
            <span>
              <RightIcon />
            </span>
            <span className="text-[#0065C1]">Project</span>
            {selectedStatus ? (
              ""
            ) : (
              <>
                <span>
                  <RightIcon />
                </span>
                <span>{selectedStatus}</span>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-5 ">
            <div
              onClick={() => handleClick(ProjectsEnum.ONGOING)}
              className={`mx-1 flex h-[80px] w-[220px] cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg ${
                selectedStatus === ProjectsEnum.ONGOING
                  ? "bg-[#c1d8f7] outline outline-1 outline-blue-700"
                  : ""
              }`}
            >
              <div
                className={`flex flex-col gap-1 py-1 pl-2 ${
                  isLoading && "mb-1 justify-end"
                }`}
              >
                <span className=" text-2xl font-semibold text-slate-600">
                  {data?.projects?.length}
                </span>
                <span className=" text-sm text-slate-400">ONGOING</span>
              </div>
              <div className=" flex h-[100%] items-center pb-3 pr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{
                    backgroundColor: "#E0F8FD",
                    borderRadius: "50%",
                    margin: "1em",
                    color: "#01CFE9",
                    padding: "10px",
                  }}
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
            </div>
            <div
              onClick={() => handleClick(ProjectsEnum.UPCOMING)}
              className={`mx-1 flex h-[80px] w-[220px] cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg ${
                selectedStatus === ProjectsEnum.UPCOMING
                  ? "bg-[#c1d8f7] outline outline-1 outline-blue-700"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-1 py-1 pl-2">
                <span className=" text-2xl font-semibold text-slate-600">
                  0
                </span>
                <span className=" text-sm text-slate-400">UPCOMING</span>
              </div>
              <div className=" flex h-[100%] items-center pb-3 pr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{
                    backgroundColor: "#E2ECFE",
                    borderRadius: "50%",
                    margin: "1em",
                    color: "#0C6EFC",
                    padding: "10px",
                  }}
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
            </div>
            <div
              onClick={() => handleClick(ProjectsEnum.COMPLETED)}
              className={`mx-1 flex h-[80px] w-[220px] cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg ${
                selectedStatus === ProjectsEnum.COMPLETED
                  ? "bg-[#c1d8f7] outline outline-1 outline-blue-700"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-1 py-1 pl-2">
                <span className=" text-2xl font-semibold text-slate-600">
                  0
                </span>
                <span className=" text-sm text-slate-400">COMPLETED</span>
              </div>
              <div className=" flex h-[100%] items-center pb-3 pr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{
                    backgroundColor: "#E4F8EC",
                    borderRadius: "50%",
                    margin: "1em",
                    color: "#28C66E",
                    padding: "10px",
                  }}
                >
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
            </div>
            <div
              onClick={() => handleClick(ProjectsEnum.DISPUTED)}
              className={`mx-1 flex h-[80px] w-[220px] cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg ${
                selectedStatus === ProjectsEnum.DISPUTED
                  ? "bg-[#c1d8f7] outline outline-1 outline-blue-700"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-1 py-1 pl-2">
                <span className=" text-2xl font-semibold text-slate-600">
                  0
                </span>
                <span className=" text-sm text-slate-400">DISPUTED</span>
              </div>
              <div className=" flex h-[100%] items-center pb-3 pr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{
                    backgroundColor: "#FDEAEB",
                    borderRadius: "50%",
                    margin: "1em",
                    color: "#EF7E81",
                    padding: "10px",
                  }}
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="18" y1="8" x2="23" y2="13"></line>
                  <line x1="23" y1="8" x2="18" y2="13"></line>
                </svg>
              </div>
            </div>
            <div
              onClick={() => handleClick(ProjectsEnum.TERMINATED)}
              className={`mx-1 flex h-[80px] w-[220px] cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg ${
                selectedStatus === ProjectsEnum.TERMINATED
                  ? "bg-[#c1d8f7] outline outline-1 outline-blue-700"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-1 py-1 pl-2">
                <span className=" text-2xl font-semibold text-slate-600">
                  0
                </span>
                <span className=" text-sm text-slate-400">TERMINATED</span>
              </div>
              <div className=" flex h-[100%] items-center pb-3 pr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{
                    backgroundColor: "#F6E2E2",
                    borderRadius: "50%",
                    margin: "1em",
                    color: "#BF3535",
                    padding: "10px",
                  }}
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
              </div>
            </div>
          </div>
          <div className="p-2">
            <InlineForm status={selectedStatus} />
          </div>
          {data ? (
            data.projects.map((value) => {

              return (
                <>
                  {modal ? (
                    <DialogDemo
                      proj={currentProj}
                      modal={modal}
                      setModal={setModal}
                    />
                  ) : (
                    <span>
                      <ProjectComp proj={value} setModal={setModal}  setCurrentProj = {setCurrentProj}/>
                    </span>
                  )}
                </>
              );
            })
          ) : (
            <div className="flex h-[50vh] w-[100%] items-center justify-center rounded-lg bg-white shadow-lg">
              <figure className="flex flex-col items-center justify-center">
                {isLoading ? (
                  <Loading className="" />
                ) : (
                  <>
                    <Image
                      className="h-[200px] w-[200px]"
                      src="/images/searching.gif"
                      alt=""
                      width="22"
                      height="22"
                    />
                    <figcaption className="text-[#2863C2]">
                      No Data Found!
                    </figcaption>
                  </>
                )}
              </figure>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
const DialogDemo = ({
  modal,
  setModal,
  proj,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  proj: Project;
}) => {
  const { setProject,resetProject } = useProjectStore();
  const HandleClick = () => {
    setProject(proj);
  };
  return (
    <Dialog.Root open={modal}>
      {
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 " />

          <Dialog.Content
            className={`${mont.className} data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] flex w-[90vw] min-w-[max-content] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
          >
            <div
              className="scrollbar mt-5 flex h-[max-content] flex-grow bg-white"
              id="style-1"
            >
              <div className="force-overflow flex-grow rounded-lg pl-10 pr-10  ">
                <div
                  className={` ${mont.className} flex flex-col  rounded-lg bg-white shadow-lg`}
                >
                  <div className=" rounded-t-lg bg-white pb-4 shadow-md">
                    <div className="border-b border-slate-200 pb-2 pl-3 pt-3 text-2xl">
                      Project Details
                    </div>
                    <div className="text-md flex justify-between ">
                      <div className=" mt-2 flex flex-col gap-3 p-4">
                        <div className="flex max-w-[280px] flex-col">
                          <span className="text-sm font-semibold">
                            {proj.project_name}
                          </span>
                          <span>Project Name</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold">US Dollar</span>
                          <span>Currency</span>
                        </div>
                      </div>

                      <div className=" mt-2 flex flex-col gap-3 p-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">
                            {proj.duration} {proj.duration_unit}
                          </span>
                          <span>Duration</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold">Variable</span>
                          <span>Payment Type</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {proj.timeOverlap ? proj.timeOverlap : "4"} hr
                          </span>
                          <span>Minimum Overlap</span>
                        </div>
                      </div>

                      <div className=" mt-2 flex flex-col gap-3 p-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">
                            07 Dec 2023 to 19 Feb 2024
                          </span>
                          <span>Listing Duration</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {proj.nda ? "Yes" : "No"}
                          </span>
                          <span>NDA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" bg-white pb-4 shadow-md">
                    <div className="border-b border-slate-200 pb-2 pl-3 pt-3 text-2xl">
                      Project Description
                    </div>
                    <div className="p-4 text-sm text-gray-500">
                      {proj.description}
                    </div>
                  </div>
                  <div className="rounded-b-lg bg-white pb-4 shadow-md">
                    <div className="border-b border-slate-200 pb-2 pl-3 pt-3 text-2xl">
                      Requirement Details
                    </div>
                    <div className="flex justify-between bg-white text-lg ">
                      <div className=" mt-2 flex flex-col gap-3 p-4">
                        <div className="flex flex-col">
                          <div className="flex max-w-[500px] flex-wrap gap-2">
                            {proj?.skills?.length ? (
                              <div className="flex flex-col gap-1">
                                <span className="text-lg">Skills</span>
                                <div className="max-w-[100% flex flex-wrap gap-2">
                                  {proj
                                    ? proj?.skills?.map((val, index) => (
                                        <span
                                          key={index}
                                          className="w-[max-content] rounded-md bg-[#E3F2FD] p-[2px]  px-2 text-xs font-medium text-[#2196F3]"
                                        >
                                          {val.name}
                                        </span>
                                      ))
                                    : ""}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex max-w-[500px] flex-wrap gap-2">
                            {proj?.tools?.length ? (
                              <div className="flex flex-col gap-1">
                                <span className="text-lg">Tools</span>
                                <div className="flex flex-wrap gap-2">
                                  {proj?.tools?.map((val, index) => (
                                    <span
                                      key={index}
                                      className="w-[max-content] rounded-md bg-[#E3F2FD] p-[2px] px-2 text-xs font-medium text-[#2196F3]"
                                    >
                                      {val.name}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    {
                      <Link
                        onClick={HandleClick}
                        href={`/bid/${proj.id}`}
                        className="mr-5 mt-5 flex cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400"
                      >
                        View Bids <RightIcon />
                      </Link>
                    }
                  </div>
                </div>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
                onClick={() => {
                  setModal(false);
                }}
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      }
    </Dialog.Root>
  );
};

const ProjectComp = ({
  proj,
  setModal,
  setCurrentProj
}: {
  proj: Project;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentProj:React.Dispatch<React.SetStateAction<Project>>;
}) => {
  const {setProject} = useProjectStore()
  const HandleClick = () => {
    setModal(true);
    setCurrentProj(proj)
  };

  const { data } = api.project.getMyProjects.useQuery();
  let user;
  const project = data?.projects?.find(
    (proje) => proje.projectid === proj.projectid,
  );
  if (project) {
    const clientTeamMember = project.team_members.find(
      (member) => member.role === "null",
    );
    if (clientTeamMember) {
      user = data?.users.get(clientTeamMember?.id);
    }
  }
  return (
    <>
      <div
        className={`${mont.className} flex h-[max-content] cursor-pointer  flex-col justify-between gap-5 rounded-lg bg-white p-5 shadow-md`}
        onClick={HandleClick}
      >
        <div className="flex items-center justify-between">
          <span className=" rounded-md bg-green-100 p-[2px] px-2 text-sm font-medium text-green-600">
            {proj.status === "open_listing"
              ? "Open Listing"
              : proj.status === "in_development"
                ? "In Development"
                : "In Review"}
          </span>
          <span className=" cursor-pointer ">
            <HeartIcon />
          </span>
        </div>
        <div className="flex justify-between px-[1rem]  ">
          <div className="flex w-[65%] flex-col gap-5">
            <span className="text-lg">{proj.project_name}</span>
            <div className="mr-3 mt-3 flex flex-col gap-3 text-sm">
              <div className="flex gap-5">
                <span className="text-md">Variable Price</span>
                <span className="text-md flex items-center gap-1">
                  <Image
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgBjVPLbcJAFLTN9+gSTAWBDqADqAB8QAhxQFSAqYDkgBBwcKgAOoBUEHeAS/ANxDczzj60GEhY6ek9v52dnZ1dm8aDMR6PnXQ63T2fz1V8OuyZphkgBafTadBut8PkGjPZmE6n3cvl8o4yQg4QX4roDUFiw7Isr9lsDp4SzWazPlR4WPyRy+U813WjpFIkD0T1JJmpgRqY9EFE6Z7xxwCWZH2UtVartbwhmkwmG2ZMFKTn+7693W4b6mhL3RtYsIJyR/CW2qGM5FCNAEejUXG/329SqdSQAQXf7Mk8TJ9zjVr7SwTmGJDP55cCxK35SBHICwzWmUxmKPOCxQbFKxFk28wJc4sgmPM4DNbYsCyTgkXf1hVF4okAQb7m7fCmGKzRDnT/lKJIVxQDdrtdVYCHw6GHZAO4YbA+Ho+uzAsWioIrEaSvkUKYWhdgp9MJACrB1B4jm80W2JN5hQ3V2vt3ZGhv49nQ3pwLos8bIg71Nmhy6dH/pEjo14q1/uYsHYQjuEr2QjdeBntCgs0q+twNkbrmGlXB7JVOxpo9lA5MryUV3/39ugcoQ9lZKXF0X/4l4uDvgNe9UJ+xMiip6Df3EpFSFhuLo4YI99kFcPwAwawiRF+qxvsAAAAASUVORK5CYII="
                    alt="Mpin"
                    height="22"
                    width="22"
                    className="mpin h-[17px] w-[17px]"
                  ></Image>
                  <span>
                    {proj?.countries?.length ? proj.countries[0] : "No Country"}
                  </span>
                </span>
                <span className="text-md">
                  {getTimeDifference(proj.created_at.toDateString())}
                </span>
              </div>
              <div>
                <TruncatedDescription description={proj.description} />
              </div>
            </div>
          </div>
          <div className="flex flex-grow items-start gap-[3rem]">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span>
                  <Avatar
                    radius="full"
                    fallback="A"
                    size="3"
                    src={`${user?.imageUrl}`}
                  />
                </span>
                <div className="flex flex-col">
                  <span>{`${user?.firstName} ${user?.lastName}`}</span>
                </div>
              </div>
              {proj?.skills?.length ? (
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Skills</span>
                  <div className="flex max-w-[150px] flex-wrap gap-2">
                    {proj
                      ? proj?.skills?.map((val, index) => (
                          <span
                            key={index}
                            className="w-[max-content] rounded-md bg-[#E3F2FD] p-[2px]  px-2 text-xs font-medium text-[#2196F3]"
                          >
                            {val.name}
                          </span>
                        ))
                      : ""}
                  </div>
                </div>
              ) : (
                ""
              )}
              {proj?.tools?.length ? (
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Tools</span>
                  <div className="flex max-w-[150px] flex-wrap gap-2">
                    {proj?.tools?.map((val, index) => (
                      <span
                        key={index}
                        className="w-[max-content] rounded-md bg-[#E3F2FD] p-[2px] px-2 text-xs font-medium text-[#2196F3]"
                      >
                        {val.name}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center gap-3 pt-2 text-sm">
              <span className="flex items-center gap-1 rounded-md bg-[#FFEDE0] px-2 py-[2px] text-sm">
                <span className="text-[#FF9F43]">
                  <StarIcon />
                </span>
                <span>5</span>
              </span>
              <span className="text-sm">0 Projects</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TruncatedDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncateText = (text: string, limit: number) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return `${words.slice(0, limit).join(" ")}...`;
    }
    return text;
  };
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedDesc = truncateText(description, 30);

  return (
    <div className={`${mont.className}`}>
      <p>{isExpanded ? description : truncatedDesc}</p>
      {description.split(" ").length > 30 && (
        <button
          className="underline-[#0185E4] mt-1 text-[#0185E4] underline"
          onClick={toggleExpand}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};
function getTimeDifference(date: string): string {
  const currentDate: Date = new Date();
  const providedDate: Date = new Date(date);
  const timeDifference: number = currentDate.getTime() - providedDate.getTime(); // Difference in milliseconds

  const hoursDifference: number = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours

  return `${hoursDifference} hours ago`;
}
