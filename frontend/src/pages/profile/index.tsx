import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Avatar } from "@radix-ui/themes";
import { StarIcon } from "@radix-ui/react-icons";
export default function Home() {
  const user = useUser();
  return (
    <>
      <div className="flex min-h-[100vh] justify-between gap-5 bg-[#F8F8F8] p-4">
        <div className="flex h-[max-content] pb-5 w-[25vw] flex-col items-center gap-5 rounded-md bg-white pt-5 shadow-md">
          <div>
            <Avatar
              src={user?.user?.imageUrl}
              radius="small"
              fallback="A"
              size="7"
            />
          </div>
          <div className="flex flex-col items-center font-medium">
            <div>{user?.user?.fullName}</div>
            <div className="text-sm">Web developer</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1 text-[#FFA34A] ">
              <StarIcon className="h-[22px] w-[22px]" />
              <StarIcon className="h-[22px] w-[22px]" />
              <StarIcon className="h-[22px] w-[22px]" />
              <StarIcon className="h-[22px] w-[22px]" />
              <StarIcon className="h-[22px] w-[22px]" />
            </div>
            <div className="flex gap-1 text-xs ">
              <span>0 Projects |</span>
              <span>0 Reviews</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1 text-[#FFA34A] ">
              <StarIcon className="h-[22px] w-[22px]" />
              <StarIcon className="h-[22px] w-[22px]" />
              <StarIcon className="h-[22px] w-[22px]" />
              <StarIcon className="h-[22px] w-[22px]" />
              <StarIcon className="h-[22px] w-[22px]" />
            </div>
            <div className="flex gap-1 text-xs">
              Trumio Rating
            </div>
          </div>
          <div className="flex text-xs mx-2 items-start flex-col gap-1 ">
            <span className="text-xl font-light border-b border-slate-200 pb-2 w-[100%]">Trumio Reviews</span>
            <span className="mt-2">Highly active on platform, usually responds within 6 hrs, top dispute solver.</span>
          </div>
          <div className="flex w-[100%] flex-col justify-start p-3">
            <div className="border-b border-slate-200 pb-2 text-xl font-light">
              Details
            </div>
            <div className="mt-5 flex flex-col">
              <div className="text-lg"> A.T University</div>
              <div className="text-xs">Associate Of Arts</div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="text-sm">Location: </span>
              <span className="text-sm">Delhi, East Delhi, India</span>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <div className="text-sm">Ceritficates</div>
              <div className="text-xs">
                <span className="w-[max-content] rounded-md bg-[#E3F2FD] p-[2px]  px-2 text-xs font-medium text-[#2196F3]">
                  AWS Certified
                </span>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <div className="text-sm">Skills</div>
              <div className="text-xs">
                <span className="w-[max-content] rounded-md bg-[#E3F2FD] p-[2px]  px-2 text-xs font-medium text-[#2196F3]">
                  React
                </span>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <div className="text-sm">Tools</div>
              <div className="text-xs">
                <span className="w-[max-content] rounded-md bg-[#E3F2FD] p-[2px]  px-2 text-xs font-medium text-[#2196F3]">
                  vscode
                </span>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <div className="text-sm">Language</div>
              <div className="text-xs">
                <span className="w-[max-content] rounded-md bg-[#E0F7FA] p-[2px]  px-2 text-xs font-medium text-[#0097A7]">
                  English
                </span>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <div className="text-sm">Time Zone</div>
              <div className="text-xs">
                <span className="w-[max-content] rounded-md bg-[#E0F7FA] p-[2px]  px-2 text-xs font-medium text-[#0097A7]">
                  IST(UTC+05:30)
                </span>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <div className="text-sm">Social Links</div>
              <div className="text-xs">No Links</div>
            </div>
          </div>
          <div className=" flex items-center justify-center">
            <span className="flex w-[150px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
              Edit
            </span>
          </div>
        </div>

        <div className="flex flex-grow flex-col gap-4">
          <div className="flex w-[100%]  gap-4">
            <div className="flex max-w-[320px] flex-grow flex-wrap gap-5 pb-2">
              <div
                className={`mx-1 flex h-[100px] w-[250px] cursor-pointer items-center justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg`}
              >
                <div className="flex flex-col gap-1 py-1 pl-2">
                  <span className=" text-xl font-semibold text-slate-600">
                    0
                  </span>
                  <span className=" text-xs text-slate-400">
                    Completed Projects
                  </span>
                </div>
                <div className="  mr-4  mt-1 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#E4F7EC] p-2 text-[#28C76F] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex max-w-[320px]   flex-grow flex-wrap gap-5 pb-2">
              <div
                className={`mx-1 flex h-[100px] w-[250px] cursor-pointer items-center justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg`}
              >
                <div className="flex flex-col gap-1 py-1 pl-2">
                  <span className=" text-xl font-semibold text-slate-600">
                    USD 10
                  </span>
                  <span className=" text-xs text-slate-400">Hourly Rate</span>
                </div>
                <div className=" mr-4  mt-1 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FFEDE0] p-2  ">
                  <Image
                    width="25"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG8SURBVHgB1VRNVsJADE5a3OMN8AYcoQJ79Qb2uXIlnKDlBNSVC58PvAHsFfAG3IDeQPbSxqQz0pYWOuW54XtvykzI5EsmPwDnDtwX0NhpAlhP/JfDx5Zegg2vFcQ0AyueorsMoS4BjXsef30wAvnozodVWtYB4xNedwDRFbqfKEv2iYzgXfvm01unX0WAKUHnm4/8PHiN7sfy2CV2xuHvgrcbJr8EkwiUccEWKrE10NFoFEX2gsbdCUQwg59ohY8qmfTitODCboMNN3y8V7r0DBXIPFGXoBZoyEn2q7RKIpBkWrfMzZ5SO306CNXCL36jgMt0AwYoRKAqpsTfE/vDKhgqKT1VwrZUmc9HJ2Nc0ExkFo5YZ83V6B0lEEWOZp03fnp/lOSAwvw57quXLO8P/SSypuzMJOkPCyWKoJSAK+NqT1KvPxq27JpHIjiEOv2Rce9vsxsVMQ3wYR6k8rr9oQ3raswmWU3GvSSnkGTSgDdL/s32QKhkyPejwlxqpIzzgKOQi15eRYwleWiJDujklYFeHUdb3DmAUAEmlSoa6aPpjNqNkUoCRdJjZfLACPkZZUSgSNjTf5xR54NfKk7alL9vN2YAAAAASUVORK5CYII="
                    height="22"
                    alt="money"
                  ></Image>
                </div>
              </div>
            </div>
            <div className="flex max-w-[320px]   flex-grow flex-wrap gap-5 pb-2">
              <div
                className={`mx-1 flex h-[100px] w-[250px] cursor-pointer items-center justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg`}
              >
                <div className="flex flex-col gap-1 py-1 pl-2">
                  <span className=" text-xl font-semibold text-slate-600">
                    1y 0m
                  </span>
                  <span className=" text-xs text-slate-400">
                    Work Experience
                  </span>
                </div>
                <div className=" mr-4  mt-1 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FFEDE0] p-2 text-[#FF7D1C]  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>{" "}
                </div>
              </div>
            </div>
            <div className="flex max-w-[320px]   flex-grow flex-wrap gap-5 pb-2">
              <div
                className={`mx-1 flex h-[100px] w-[250px] cursor-pointer items-center justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg`}
              >
                <div className="flex flex-col gap-1 py-1 pl-2">
                  <span className="max-w-[60%] text-xs font-semibold text-slate-600">
                    2 hours/week IST(UTC+05:30)
                  </span>
                  <span className=" text-xs text-slate-400">Availability</span>
                </div>
                <div className=" mr-4 mt-1 flex h-[38px] w-[38px]  items-center justify-center rounded-full bg-[#E0ECF7] p-2  text-[#0065C1]  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="flex min-h-[100px] flex-col gap-1 rounded-md bg-white p-3 px-5 shadow-md">
            <span className="font-medium">I am Luv</span>
            <p className="text-sm">I am Web Developer</p>
          </div>
          <div className="flex h-[50vh] w-[100%] flex-col rounded-lg bg-white shadow-lg">
            <div className="flex w-[100%] px-5 py-4 text-xl ">
              Recent Projects
            </div>
            <figure className="flex flex-col items-center justify-center">
              <Image
                width="22"
                height="22"
                className="mt-5 h-[200px] w-[200px]"
                src="/images/projectsearch.gif"
                alt=""
              />
              <figcaption className="text-[#2863C2]">No Data Found!</figcaption>
            </figure>
          </div>
          <div className="mb-2 flex h-[50vh] w-[100%] flex-col rounded-lg bg-white shadow-lg">
            <div className="flex w-[100%] px-5 py-4 text-xl ">Reviews(0)</div>
            <figure className="flex flex-col items-center justify-center">
              <Image
                width="30"
                height="30"
                className="mt-5 h-[180px] w-[250px]"
                src="/images/noreviews.gif"
                alt=""
              />
              <figcaption className="text-[#2863C2]">No Data Found!</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}
