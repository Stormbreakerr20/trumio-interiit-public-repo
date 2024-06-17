import Head from "next/head";
import Link from "next/link";
import PersonalIcon from "~/components/icons/PersonaIcon";
import { Avatar } from "@radix-ui/themes";
import StarIcon from "~/components/icons/StarIcon";
import AttachIcon from "~/components/icons/AttachIcon";
import WatchIcon from "~/components/icons/WatchIcon";
import TickIcon from "~/components/icons/TickIcon";
import InfoIcon from "~/components/icons/InfoIcon";
import RightIcon from "~/components/icons/RightIcon";
import { ChevronLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import * as Accordian from "@radix-ui/react-accordion";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <div className="items flex min-h-[100vh] justify-center bg-[#F8F8F8] pb-[2rem]">
        <div className="mx-[2vw] flex w-[100%] justify-between gap-5">
          <div className="flex h-[max-content] w-[25%] flex-col gap-3 rounded-lg bg-white p-5 shadow-lg">
            <div className="flex h-[max-content] w-[100%] justify-between">
              <span className=" rounded-md bg-green-100 p-[2px] px-2 text-sm font-medium text-green-600">
                Open
              </span>
              <span className=" text-sm font-medium text-red-500">
                69 Days left
              </span>
            </div>
            <div>Building a PEP LLM</div>
            <div className="mt-2 flex items-center gap-3">
              <span className="pt-2">
                <Avatar radius="full" fallback="A" size="2" />
              </span>
              <div className="flex flex-col">
                <div>Rzolut Technologies</div>
                <div className="flex items-center gap-2 text-xs ">
                  <span className="flex items-center rounded-md bg-[#FFEDE0] px-2 py-[2px]">
                    <span className="text-[#FF9F43]">
                      <StarIcon />
                    </span>
                    <span>0</span>
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
                <span>Nov 21,23</span>
              </div>
              <span className="flex items-center">
                <AttachIcon /> <span>1</span>
              </span>
            </div>
            <div className="flex flex-col gap-1 text-xs ">
              <span>Tags:</span>
              <div className="flex gap-2">
                <span className="rounded-md bg-[#E3F2FD] p-[2px] px-2 text-xs font-medium text-[#2196F3]">
                  Machine Learning
                </span>
                <span className="rounded-md bg-[#E3F2FD] p-[2px] px-2 text-xs font-medium  text-[#2196F3]">
                  + 1
                </span>
              </div>
            </div>
            <div>
              <span>Description:</span>
              <p className="text-sm">
                The project is to develop a preliminary LLM that specifically
                identifies Politically-Exposed- People (PEPs) and develops the
                basic data fields relating to a PEP
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
                  <WatchIcon />
                </span>
                <div className="flex flex-col text-sm">
                  <span className="font-semibold">Milestone</span>
                  <span className="text-xs">Add milestone</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="rounded-md bg-[#ECECEC] p-3 text-[#757575]">
                  <TickIcon />
                </span>
                <div className="flex flex-col text-sm">
                  <span>Preview</span>
                  <span className="text-xs">Review before posting</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex h-[max-content] flex-col rounded-md shadow-md bg-white">
                <div className="mt-5 border-b border-slate-200 pb-1 pl-3 text-lg">
                  Project Bid Estimate
                </div>
                <div className="mb-[2rem] mt-3 flex gap-5 pl-3">
                  <div className="mr-5 flex flex-col gap-2">
                    <span className="font-medium">36w</span>
                    <span className="flex items-center gap-1 text-sm">
                      Estimated Duration{" "}
                      <span>
                        <InfoIcon />
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-medium">$8</span>
                    <span className="flex items-center gap-1 text-sm">
                      Talent Cost
                      <span>
                        <InfoIcon />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex h-[max-content] flex-col gap-4 shadow-md bg-white p-3">
                <div className="mt-[1rem]">Milestones</div>
                <div className="relative overflow-x-auto">
                  <table className="w-full rounded-md text-left text-sm rtl:text-right mb-[2rem] ">
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
                      <tr className="border-b bg-white">
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 font-medium"
                        >
                          Milestone #1
                        </th>
                        <td className="px-6 py-4">New mil</td>
                        <td className="px-6 py-4">$4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#0065C1] cursor-pointer">
                <span className="rounded-full bg-[#D9E9F5] p-1">
                  <ChevronLeftIcon />{" "}
                </span>
                Back
              </div>
              <div className=" flex items-center justify-center">
                <span className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
                  Save & Continue <RightIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
