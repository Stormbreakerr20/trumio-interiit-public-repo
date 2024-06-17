import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import RightIcon from "../../components/icons/RightIcon";
import { useState } from "react";
import InlineForm from "../../components/team/InlineForm";
import Image from "next/image";

const mont = Montserrat({ subsets: ["latin"] });

enum TeamEnum {
  TEAMS = "TEAMS",
  CLIENTS = "CLIENTS",
  RECOMMENDED = "RECOMMENDED",
  JOINREQ = "JOINREQ",
  FAVORITES = "FAVORITES",
}

export default function Team() {
  const [selectedStatus, setSelectedStatus] = useState<TeamEnum>(
    TeamEnum.CLIENTS,
  );

  const handleClick = (val: TeamEnum) => {
    setSelectedStatus(val);
  };

  return (
    <>
      <div className="flexbg-[#f8f8f8]">
        <div className=" flex flex-col gap-5 p-5">
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
            <span className="text-[#0065C1]">My Teams</span>
            {selectedStatus? (
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
              onClick={() => handleClick(TeamEnum.TEAMS)}
              className={`mx-1 flex h-[80px] w-[220px] cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg ${
                selectedStatus === TeamEnum.TEAMS
                  ? "bg-[#c1d8f7] outline outline-1 outline-blue-700"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-1 py-1 pl-2">
                <span className=" text-2xl font-semibold text-slate-600">
                  0
                </span>
                <span className=" text-sm text-slate-400">TEAMS</span>
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
              onClick={() => handleClick(TeamEnum.CLIENTS)}
              className={`mx-1 flex h-[80px] w-[220px] cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg ${
                selectedStatus === TeamEnum.CLIENTS
                  ? "bg-[#c1d8f7] outline outline-1 outline-blue-700"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-1 py-1 pl-2">
                <span className=" text-2xl font-semibold text-slate-600">
                  0
                </span>
                <span className=" text-sm text-slate-400">CLIENTS</span>
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
              onClick={() => handleClick(TeamEnum.RECOMMENDED)}
              className={`mx-1 flex h-[80px] w-[220px] cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg ${
                selectedStatus === TeamEnum.RECOMMENDED
                  ? "bg-[#c1d8f7] outline outline-1 outline-blue-700"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-1 py-1 pl-2">
                <span className=" text-2xl font-semibold text-slate-600">
                  0
                </span>
                <span className=" text-sm text-slate-400">RECOMMENDED</span>
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
              onClick={() => handleClick(TeamEnum.JOINREQ)}
              className={`mx-1 flex h-[80px] w-[220px] cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg ${
                selectedStatus === TeamEnum.JOINREQ
                  ? "bg-[#c1d8f7] outline outline-1 outline-blue-700"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-1 py-1 pl-2">
                <span className=" text-2xl font-semibold text-slate-600">
                  0
                </span>
                <span className=" text-sm text-slate-400">JOIN REQUESTS</span>
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
              onClick={() => handleClick(TeamEnum.FAVORITES)}
              className={`mx-1 flex h-[80px] w-[220px] cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg ${
                selectedStatus === TeamEnum.FAVORITES
                  ? "bg-[#c1d8f7] outline outline-1 outline-blue-700"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-1 py-1 pl-2">
                <span className=" text-2xl font-semibold text-slate-600">
                  0
                </span>
                <span className=" text-sm text-slate-400">FAVORITES</span>
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
          <div className="flex h-[50vh] w-[100%] items-center justify-center rounded-lg bg-white shadow-lg">
            <figure className="flex flex-col items-center justify-center">
              <Image
              width="22"
              height="22"
                className="h-[200px] w-[200px] "
                src="/images/searching.gif"
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
