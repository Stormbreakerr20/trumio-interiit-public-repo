import { Avatar } from "@radix-ui/themes";
import StarIcon from "~/components/icons/StarIcon";
import AttachIcon from "~/components/icons/AttachIcon";
import WatchIcon from "~/components/icons/WatchIcon";
import TickIcon from "~/components/icons/TickIcon";
import InfoIcon from "~/components/icons/InfoIcon";
import RightIcon from "~/components/icons/RightIcon";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  Link2Icon,
  PlusIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import * as uuid from "uuid";
import { MilestoneSchema } from "./types";
import React from "react";
import Loading from "~/components/Loading";

const mont = Montserrat({ subsets: ["latin"] });

const TruncatedDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to truncate the description to a certain word limit
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

export default function Home() {
  const [isPreview, setPreview] = useState<boolean>(false);
  const [milestones, setMiles] = useState<MilestoneSchema[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const router = useRouter();
  if (typeof router.query.projectId != "string") {
    router.push("/marketplace").catch((err) => console.error(err));
  }
  const { data: project, isLoading } = api.project.getProject.useQuery({
    projectId: router.query.projectId as string,
  });

  const createBidMutation = api.project.createBid.useMutation();

  const user = useUser();

  const handleSubmit = () => {
    try {
      if (project) {
        createBidMutation.mutate({
          bid_data: { milestones: milestones, start_date: startDate },
          projectId: project.id,
        });
      }
    } catch (error) {
      console.error("Error creating bid:", error);
    }
  };
  const ai_milestones_mutation = api.project.getMilestones.useMutation();

  const get_ai_milestones = async (project_id: string) => {
    const ai_milestones = await ai_milestones_mutation.mutateAsync({
      projectId: project_id,
    });
    if (ai_milestones instanceof Error) {
    } else {
      setMiles(ai_milestones);
    }
  };

  React.useEffect(() => {
    if (project && !ai_milestones_mutation.isSuccess) {
      get_ai_milestones(project.id).catch((err) => console.error(1, err));
    }
  }, [project]);
  return (
    <>
      <div
        className={`${mont.className} items flex min-h-[100vh] justify-center bg-[#F8F8F8] pb-[2rem] pt-[2rem]`}
      >
        <div className="mx-[2vw] flex w-[100%] justify-between gap-5">
          <div className="flex h-[max-content] w-[25%] flex-col gap-3 rounded-lg bg-white p-5 shadow-lg">
            <div className="flex h-[max-content] w-[100%] justify-between">
              <span className=" rounded-md bg-green-100 p-[2px] px-2 text-sm font-medium text-green-600">
                {project?.status
                  .split("_")
                  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                  .join(" ")}
              </span>
              <span className=" text-sm font-medium text-red-500">
                {project?.duration} Days left
              </span>
            </div>
            <div>{project?.project_name}</div>
            <div className="mt-2 flex items-center gap-3">
              <span className="pt-2">
                {!user.user?.imageUrl ? null : (
                  <Avatar
                    radius="full"
                    fallback="A"
                    size="2"
                    src={user.user.imageUrl}
                  />
                )}
              </span>
              <div className="flex flex-col">
                <div>
                  {!user.user
                    ? null
                    : `${user.user.firstName} ${user.user.lastName}`}
                </div>
                <div className="flex items-center gap-2 text-xs ">
                  <span className="flex items-center rounded-md bg-[#FFEDE0] px-2 py-[2px]">
                    <span className="text-[#FF9F43]">
                      <StarFilledIcon />
                    </span>
                    <span>5</span>
                  </span>
                  <span>0 Projects</span>
                </div>
              </div>
            </div>
            <div className="mt-5 border-b border-slate-200 pb-1 text-lg">
              Project Details
            </div>
            <div className="flex justify-between">
              <div className="flex gap-3">
                <span>Posed Date: </span>
                <span className="flex items-center gap-1">
                  <span>{project?.created_at.getDate()}</span>
                  <span>
                    {project?.created_at.toLocaleString("default", {
                      month: "short",
                    })}
                  </span>
                </span>
              </div>
              <span className="flex items-center">
                <Link2Icon /> <span>1</span>
              </span>
            </div>
            <div className="flex flex-col gap-1 text-xs ">
              <span>Tags:</span>
              <div className="flex gap-2">
                <span className="rounded-md bg-[#E3F2FD] p-[2px] px-2 text-xs font-medium text-[#2196F3]">
                  No Tag
                </span>
              </div>
            </div>
            <div>
              <span>Description:</span>
              <p className="text-sm">
                <TruncatedDescription
                  description={project ? project.description : ""}
                />
              </p>
            </div>
            <div className=" mt-5 flex items-center justify-center">
              <span className="cursor-pointer rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
                Message
              </span>
            </div>
          </div>
          <div className="flex h-[max-content] flex-grow flex-col gap-5">
            <div className="flex gap-5">
              <div className="flex items-center gap-4 text-[#2495E6]">
                <span className="rounded-md bg-[#D9E9F5] p-3">
                  <ClockIcon />
                </span>
                <div className="flex flex-col text-sm">
                  <span className="font-semibold">Milestone</span>
                  <span className="text-xs">Add milestone</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="rounded-md bg-[#ECECEC] p-3 text-[#757575]">
                  <CheckIcon />
                </span>
                <div className="flex flex-col text-sm">
                  <span>Preview</span>
                  <span className="text-xs">Review before posting</span>
                </div>
              </div>
            </div>
            {isPreview ? (
              <Preview milestones={milestones} />
            ) : ai_milestones_mutation.isLoading ? (
              <div className="flex h-[500px] gap-2 w-[100%] items-center justify-center">
                Generating Milestones using AI <Loading className="scale-75" />
              </div>
            ) : (
              <Addmilestone
                setMiles={setMiles}
                milestones={milestones}
                setStartDate={setStartDate}
                startDate={startDate}
                aiLoadingMutation={ai_milestones_mutation}
              />
            )}
            {ai_milestones_mutation.isLoading ? (
              ""
            ) : (
              <div className="flex items-center justify-between">
                <div
                  className="flex cursor-pointer items-center gap-2 text-[#0065C1]"
                  onClick={() => {
                    setPreview(false);
                  }}
                >
                  <span className="rounded-full bg-[#D9E9F5] p-1">
                    <ChevronLeftIcon />
                  </span>
                  Back
                </div>
                <div
                  className=" flex items-center justify-center"
                  onClick={
                    isPreview
                      ? handleSubmit
                      : () => {
                          setPreview(true);
                        }
                  }
                >
                  <span className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
                    Save & Continue <ChevronRightIcon />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function MilesStonesComp({
  index,
  setMiles,
  milestone,
}: {
  index: number;
  setMiles: (newMilstone: MilestoneSchema) => void;
  milestone: MilestoneSchema;
}) {
  return (
    <>
      <div className="mt-5 flex flex-col justify-between gap-5 rounded-md bg-[#FFFFFF] p-4 shadow-md">
        <div className="flex w-[100%] justify-between">
          <span>Milestone-{index + 1}</span>
          <div className="flex gap-2 text-sm">
            <div className="flex flex-col gap-3">
              <span>
                Duration<span className="text-red-500">*</span>
              </span>
              <span className="relative">
                <input
                  type="number"
                  name="duration"
                  value={milestone.duration}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setMiles({
                      ...milestone,
                      duration: parseInt((e.target as HTMLInputElement).value),
                    });
                  }}
                  placeholder="Enter"
                  id="date"
                  className=" rounded-md border px-2 py-2"
                  required
                />
                <i className="absolute right-9 top-2">w</i>
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span>
                Talent Cost<span className="text-red-500">*</span>
              </span>
              <span className="relative">
                <input
                  type="number"
                  name="talent cost"
                  placeholder="Enter"
                  value={milestone.cost}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setMiles({
                      ...milestone,
                      cost: parseInt((e.target as HTMLInputElement).value),
                    });
                  }}
                  id="date"
                  className=" rounded-md border px-2 py-2"
                  required
                />
                <i className="absolute right-9 top-2">$</i>
              </span>
            </div>
          </div>
        </div>
        <div className="mb-5 flex justify-between gap-5">
          <div className="flex flex-grow flex-col gap-3 rounded-md p-4 shadow-md">
            <span>Milestone Details</span>
            <div className="mt-3 flex flex-col gap-4">
              <div>
                <label htmlFor="first_name" className="mb-2 block text-sm">
                  Milestone Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter name"
                  value={milestone.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setMiles({
                      ...milestone,
                      name: (e.target as HTMLInputElement).value,
                    });
                  }}
                  minLength={4}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm">
                  Description
                </label>
                <textarea
                  id="message"
                  value={milestone.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setMiles({
                      ...milestone,
                      description: (e.target as HTMLTextAreaElement).value,
                    });
                  }}
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  placeholder="Enter description in 500 characters"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex h-[max-content] flex-grow flex-col gap-3 rounded-md p-4 shadow-md">
            <div>Deliverable Details</div>
            {milestone.deliverables.map((deliverable, deliverableIndex) => (
              <input
                type="text"
                key={deliverable.id}
                id="deliverable"
                className=" mt-5 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter deliverable"
                minLength={4}
                value={deliverable.text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMiles({
                    ...milestone,
                    deliverables: milestone.deliverables.map(
                      (oldDeliverable, oldDeliverableIndex) => {
                        if (oldDeliverableIndex !== deliverableIndex) {
                          return oldDeliverable;
                        } else {
                          return {
                            id: oldDeliverable.id,
                            text: (e.target as HTMLInputElement).value,
                          };
                        }
                      },
                    ),
                  });
                }}
                required
              />
            ))}
            <button
              onClick={() => {
                setMiles({
                  ...milestone,
                  deliverables: [
                    ...milestone.deliverables,
                    { id: uuid.v4(), text: "" },
                  ],
                });
              }}
              className="mt-3 flex cursor-pointer items-center gap-2 text-[#0065C1]"
            >
              <span className="rounded-full bg-[#E0F0FC] p-2">
                <PlusIcon />
              </span>
              <span>Add Deliverable</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
const Addmilestone = ({
  setMiles,
  milestones,
  setStartDate,
  startDate,
  aiLoading,
}: {
  setMiles: React.Dispatch<React.SetStateAction<MilestoneSchema[]>>;
  milestones: MilestoneSchema[];
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  aiLoading: boolean;
}) => {
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setStartDate(date);
  };
  const handleAdd = () => {
    setMiles([
      ...milestones,
      {
        id: uuid.v4(),
        name: "",
        description: "",
        cost: 0,
        duration: 0,
        deliverables: [],
      },
    ]);
  };

  const estimated_duration = milestones.reduce(
    (total, item) => total + item.duration,
    0,
  );
  const cost_net = milestones.reduce((total, item) => total + item.cost, 0);

  return (
    <>
      {aiLoading ? (
        <Loading className="scale-90" />
      ) : (
        <div className="rounded-lg bg-[#FAFAFA] p-4 shadow-md">
          <div className="border-b border-slate-200 pb-1">
            Create milestones that will make it easier to work on and track this
            project
          </div>
          <div className="mt-5 flex justify-between rounded-md bg-white p-4 text-sm shadow-md">
            <div className="flex flex-col gap-3">
              <span>
                Start Date<span className="text-red-500">*</span>
              </span>
              <input
                required
                type="date"
                name="date"
                value={startDate.toISOString().substr(0, 10)}
                onChange={handleDate}
                placeholder="select start date"
                id="date"
                className=" rounded-md border px-5 py-2"
              />
            </div>
            <div className="flex gap-5">
              <div className="mr-5 flex flex-col items-end gap-3">
                <span>Estimated Duration</span>
                <span>{estimated_duration}w</span>
              </div>
              <div className="mr-5 flex flex-col items-end gap-3">
                <span>Total cost</span>
                <span>$ {cost_net}</span>
              </div>
            </div>
          </div>
          {milestones.map((value, index) => {
            return (
              <MilesStonesComp
                milestone={value}
                key={value.id}
                index={index}
                setMiles={(newMilstone) => {
                  setMiles(
                    milestones.map((oldMilestones, oldMilestonesIndex) => {
                      if (index !== oldMilestonesIndex) {
                        return oldMilestones;
                      } else {
                        return newMilstone;
                      }
                    }),
                  );
                }}
              />
            );
          })}
          <div
            className="mt-3 flex cursor-pointer items-center gap-2 text-[#0065C1]"
            onClick={handleAdd}
          >
            <span>
              <PlusIcon />
            </span>
            <span>Add Milestone</span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 rounded-lg bg-[#FAFAFA] p-4 shadow-md">
        <div className="border-b border-slate-200 pb-1">Documents</div>
        <div className="flex flex-col gap-3">
          <div className="flex  items-center gap-1 text-xs font-normal text-gray-500 ">
            Upload detailed requirements document (optional)
            <span>
              <InfoIcon />
            </span>
          </div>
          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#1E88E5] text-[#1E88E5]"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm ">
                  <span className="font-semibold">
                    Drop files here or click to upload
                  </span>
                </p>
                <p className="text-xs ">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
const Preview = ({ milestones }: { milestones: MilestoneSchema[] }) => {
  const estimated_duration = milestones.reduce(
    (total, item) => total + item.duration,
    0,
  );
  const cost_net = milestones.reduce((total, item) => total + item.cost, 0);
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex h-[max-content] flex-col rounded-md bg-white shadow-md">
          <div className="mt-5 border-b border-slate-200 pb-1 pl-3 text-lg">
            Project Bid Estimate
          </div>
          <div className="mb-[2rem] mt-3 flex gap-5 pl-3">
            <div className="mr-5 flex flex-col gap-2">
              <span className="font-medium">{estimated_duration}w</span>
              <span className="flex items-center gap-1 text-sm">
                Estimated Duration
                <span>
                  <InfoIcon />
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-medium">${cost_net}</span>
              <span className="flex items-center gap-1 text-sm">
                Talent Cost
                <span>
                  <InfoIcon />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex h-[max-content] flex-col gap-4 bg-white p-3 shadow-md">
          <div className="mt-[1rem]">Milestones</div>
          <div className="relative overflow-x-auto">
            <table className="mb-[2rem] w-full rounded-md text-left text-sm rtl:text-right ">
              <thead className="w-[100%] bg-[#F3F2F7] text-xs uppercase text-[#5E5873]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    PAYMENT FOR
                  </th>
                  <th scope="col" className="px-6 py-3">
                    MILESTONE NAME
                  </th>
                  <th scope="col" className="px-6 py-3">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody>
                {milestones?.map((value, index) => (
                  <>
                    <tr className="border-b bg-white">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium"
                      >
                        Milestone #{index + 1}
                      </th>
                      <td className="px-6 py-4">{value.name}</td>
                      <td className="px-6 py-4">{value.cost}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
