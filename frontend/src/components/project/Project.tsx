import { useAuth } from "@clerk/nextjs";
import { Montserrat } from 'next/font/google'
import RightIcon from "../icons/RightIcon";
import ProjectStatus from "./ProjectStatus"
import { useState } from "react";
import InlineForm from "./InlineForm";
import Image from "next/image";


const mont = Montserrat({ subsets: ['latin'] })

export default function Project() {
  const { userId } = useAuth();
  const projectStatus = ProjectStatus()


  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("");

  const handleClick = (val:any) =>{
    setSelected(val)
    setStatus(val)
  }

  return (
    <>
    <div className="bg-[#f8f8f8] flex justify-center">
      <div className="flex gap-5 flex-col p-5 mt-[9vh]">
        <div className="flex ml-3 items-center gap-2">
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
          {status === "" ? (
            ""
          ) : (
            <>
              <span>
                <RightIcon />
              </span>
              <span>{status}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-5 ">
          {projectStatus.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(value.status)}
              className={`w-[220px] cursor-pointer pl-3 pt-2 mx-1 shadow-lg h-[80px] rounded-lg bg-white flex justify-between ${
                selected === value.status
                  ? "bg-[#d7e7fc] outline outline-1 outline-blue-700"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-1 pl-2 py-1">
                <span className=" font-semibold text-slate-600 text-2xl">{value.count}</span>
                <span className=" text-sm text-slate-400">{value.status}</span>
              </div>
              <div className=" h-[100%] flex">{value.img}</div>
            </div>
          ))}
        </div>
        <div className="p-2">
            <InlineForm status={status}/>
        </div>
        <div className="h-[50vh] bg-white shadow-lg rounded-lg w-[100%] flex justify-center items-center">
          <figure className="flex flex-col justify-center items-center">
            <Image
              className="h-[200px] w-[200px]"
              src="/images/searching.gif"
              alt=""
              width="22"
              height="22"
            />
            <figcaption className="text-[#2863C2]">No Data Found!</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </>
  );
}
