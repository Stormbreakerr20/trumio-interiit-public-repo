import { Avatar } from "@radix-ui/themes";
import AttachIcon from "~/components/icons/AttachIcon";
import StarIcon1 from "~/components/icons/StarIcon";
import { useProjectStore } from "~/store/ProjectStore";
import { useState } from "react";
import { Montserrat } from "next/font/google";
import { api } from "~/utils/api";
import InfoIcon from "~/components/icons/InfoIcon";
import { EyeOpenIcon, StarIcon } from "@radix-ui/react-icons";
const mont = Montserrat({ subsets: ["latin"] });
import { useEffect } from "react";
import Loading from "~/components/Loading";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

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

export default function Home() {
  const router = useRouter()
  const projectId = router.query.projectId
  const user = useUser()

  const { data: res, isLoading, isSuccess, isError } = api.project.getBids.useQuery({
    projectId
  });

  if(isError) {
    return <Loading className="stroke-red" />
  }


  return (
    !isLoading ?
    <>
      <div className="mx-5 mt-5 flex gap-5">
        <div className=" flex h-[max-content] w-[25%] flex-col gap-3 rounded-lg bg-white p-5 shadow-lg">
          <div className="flex h-[max-content] w-[100%] justify-between">
            <span className=" rounded-md bg-green-100 p-[2px] px-2 text-sm font-medium text-green-600">
            </span>
            <span className=" text-sm font-medium text-red-500">
              {res.project.duration} Days left
            </span>
          </div>
          <div>{res.project.project_name}</div>
          <div className="mt-2 flex items-center gap-3">
            <span className="pt-2">
              <Avatar
                radius="full"
                fallback="A"
                size="2"
                src={user?.imageUrl}
              />
            </span>
            <div className="flex flex-col">
              <div>
                {user?.firstName} {user?.lastName}
              </div>
              <div className="flex items-center gap-2 text-xs ">
                <span className="flex items-center rounded-md bg-[#FFEDE0] px-2 py-[2px]">
                  <span className="text-[#FF9F43]">
                    <StarIcon1 />
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
              <AttachIcon /> <span>1</span>
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
          <div className="flex w-[100%] justify-between gap-2 ">
            <div className="mt-5  flex flex-grow items-center justify-center">
              <span className="flex flex-grow cursor-pointer items-center justify-center rounded-lg bg-[#E95553] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
                Terminate
              </span>
            </div>
            <div className=" mt-5 flex flex-grow items-center justify-center">
              <span className="flex flex-grow cursor-pointer items-center justify-center rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
                Invite
              </span>
            </div>
          </div>
        </div>

        <div className="flex h-[max-content] flex-grow flex-col gap-4 rounded-lg bg-[#FAFAFA] p-4 shadow-md">
          <div className="border-b border-slate-200 pb-1 text-xl">
            Bid Stage
          </div>
          <div className="flex flex-col gap-3">
            <div className="relative overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Talent name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Bid AMT
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Attachment
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-900 ">
                  {bid_user.bids.map((bid) => {
                    let value = bid_user.users.get(bid.userId)
                    return (
                      <>
                        <tr className="border-b bg-white ">
                          <th
                            scope="row"
                            className="first-letter: flex items-center justify-center gap-1 whitespace-nowrap py-4 pr-6 font-medium text-gray-900 "
                          >
                            <span>
                              <Avatar
                                radius="full"
                                fallback="A"
                                size="2"
                                src={value.imageURL} 
                              />
                            </span>
                            <span>
                              {value.firstName} {value.lastName}
                            </span>
                          </th>
                          <td className="px-6 py-4">
                            <div className="flex  gap-1 text-[#FFA34A] ">
                              <StarIcon className="h-[18px] w-[18px]" />
                              <StarIcon className="h-[18px] w-[18px]" />
                              <StarIcon className="h-[18px] w-[18px]" />
                              <StarIcon className="h-[18px] w-[18px]" />
                              <StarIcon className="h-[18px] w-[18px]" />
                            </div>
                          </td>
                          <td className="py-4 pl-8">$90</td>
                          <td className="flex items-center gap-1  px-6 py-4 pl-10">
                            <span>
                              <AttachIcon />
                            </span>
                            <span>0</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded-md bg-[#E3F2FD] p-[2px] px-2 text-xs font-medium text-[#2196F3]">
                              New
                            </span>
                          </td>
                          <td className="py-4 pl-10">
                            <EyeOpenIcon />
                          </td>
                        </tr>
                      </>
                    );
                  }) } 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </> : <Loading className="stroke-red" />
  );
}
