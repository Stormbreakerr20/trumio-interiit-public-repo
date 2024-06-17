import {
  ChevronLeftIcon,
  HomeIcon,
  IdCardIcon,
  PlusCircledIcon,
  PlusIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import PersonalIcon from "~/components/icons/PersonaIcon";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Avatar } from "@radix-ui/themes";
import InfoIcon from "~/components/icons/InfoIcon";
import RightIcon from "~/components/icons/RightIcon";
import Link from "next/link";

export default function Home() {
  const [state, setState] = useState<string>("Account");
  const handleNext = () => {
    if (state === "Account") setState("Profile");
    else setState("Payment");
  };
  const handleBack = () => {
    if (state === "Profile") setState("Account");
    else setState("Profile");
  };

  return (
    <>
      <div className="flex max-w-[100vw] justify-center bg-[#F7F7F7]">
        <div className="mt-5 flex w-[80%] flex-col gap-5">
          <div className="text-3xl font-medium">Onboarding</div>
          <div className="flex  gap-5">
            <div
              className={`flex cursor-pointer  items-center gap-1 rounded-md p-3 ${
                state === "Account"
                  ? "bg-[#CBEAF8] font-medium text-[#4688B4]"
                  : ""
              }`}
            >
              <HomeIcon />
              <span>Account</span>
            </div>
            <div
              className={`flex cursor-pointer  items-center gap-1 rounded-md p-3 ${
                state === "Profile"
                  ? "bg-[#CBEAF8] font-medium text-[#4688B4]"
                  : ""
              }`}
            >
              <PersonalIcon />
              <span>Profile</span>
            </div>
            <div
              className={`flex cursor-pointer  items-center gap-1 rounded-md p-3 ${
                state === "Payment"
                  ? "bg-[#CBEAF8] font-medium text-[#4688B4]"
                  : ""
              }`}
            >
              <IdCardIcon />
              <span>Payment</span>
            </div>
          </div>
          {state === "Account" ? (
            <AccountSection />
          ) : state === "Profile" ? (
            <ProfileSection />
          ) : (
            <PaymentSection />
          )}

          <div
            className={`mb-5 flex w-[100%] items-center ${
              state === "Account" ? "justify-end" : "justify-between"
            }`}
          >
            {state !== "Account" && (
              <span
                onClick={handleBack}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400"
              >
                <span>
                  <ChevronLeftIcon />
                </span>
                Back
              </span>
            )}
            {state === "Payment" ? (
              <Link href={"/marketplace"} className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
                Save Changes
              </Link>
            ) : (
              <span
                onClick={handleNext}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400"
              >
                Next
                <span>
                  <RightIcon />
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const AccountSection = () => {
  const user = useUser();
  const [mobile, setMobile] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
  };
  return (
    <>
      <div className="  rounded-lg bg-white pb-4 shadow-md">
        <div className="border-b border-slate-200 pb-2 pl-5 pt-5 text-xl font-medium">
          Account Details
        </div>
        <div className="flex  items-center gap-4 px-5 pt-5">
          <div>
            <Avatar
              src={user?.user?.imageUrl}
              radius="full"
              fallback="A"
              size="8"
            />
          </div>
          <div className=" flex items-center justify-center gap-2">
            <span className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
              Update Picture
            </span>
            <span>
              <InfoIcon />
            </span>
          </div>
        </div>
        <div>
          <div className="mt-4 flex w-[100%]  gap-5 px-5 ">
            <div className="mb-5 flex-grow">
              <label
                htmlFor="name"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="name"
                id="name"
                className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="First Name"
                value = {`${user.user?.firstName}`}
                disabled
              />
            </div>
            <div className="mb-5 flex-grow">
              <label
                htmlFor="name"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="name"
                id="name"
                className="dark block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Last Name"
                value = {`${user.user?.lastName}`}
                disabled
              />
            </div>
          </div>
        </div>
        <div>
          <div className="mt-4 flex w-[100%]  gap-5 px-5 ">
            <div className="mb-5 max-w-[50%] flex-grow">
              <label
                htmlFor="number"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                Mobile number
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="text"
                  className="dark flex w-[80px] flex-grow justify-center rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  disabled
                  value={"+91"}
                />
                <input
                  type="tel"
                  id="phn"
                  className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  placeholder="Mobile Number"
                />
              </div>
            </div>
            <div className="mb-5 flex-grow">
              <label
                htmlFor="email"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                disabled
                id="email"
                className="dark block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Email Address"
                onChange={handleChange}
                value={user?.user?.emailAddresses.toLocaleString()}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 border-b border-slate-200 pb-2 pl-5 pt-5  text-xl font-medium">
          Password Reset
          <span className="text-xs">
            <InfoIcon />
          </span>
        </div>
        <div className="mt-4 flex w-[100%]  gap-5 px-5 ">
          <div className="mb-5 flex-grow">
            <label
              htmlFor="password"
              className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="password"
            />
          </div>
          <div className="mb-5 flex-grow">
            <label
              htmlFor="password"
              className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="password"
              className="dark block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="password"
            />
          </div>
        </div>
        <div className="flex w-[100%] justify-end pr-5">
          <span className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
            Save Changes
          </span>
        </div>
      </div>
    </>
  );
};

const ProfileSection = () => {
  const user = useUser();
  const [mobile, setMobile] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
  };
  return (
    <>
      <div className="  rounded-lg bg-white pb-4 shadow-md">
        <div className="border-b border-slate-200 pb-2 pl-4 pt-5 text-xl font-medium">
          About
        </div>
        <div className="flex  items-center gap-4 px-5 pt-5">
          <div>
            <Avatar
              src={user?.user?.imageUrl}
              radius="full"
              fallback="A"
              size="8"
            />
          </div>
          <div className=" flex items-center justify-center gap-2">
            <span className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
              Update Picture
            </span>
            <span>
              <InfoIcon />
            </span>
          </div>
        </div>
        <div>
          <div className="mt-4 flex w-[100%] gap-5  px-4 pr-5 ">
            <div className="mb-5 flex-grow">
              <label
                htmlFor="year"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="text"
                className="dark block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter your company name"
              />
            </div>
            <div className="mb-5 flex-grow">
              <label
                htmlFor="year"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="text"
                className="dark block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter job title"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="mt-4 flex w-[100%] gap-5  px-4 pr-5 ">
            <div className="mb-5 flex-grow">
              <label
                htmlFor="year"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                Company Tagline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="text"
                className="dark block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter your company tagline"
              />
            </div>
            <div className="mb-5 flex-grow">
              <label
                htmlFor="year"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                Company Industry <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="text"
                className="dark block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter industry"
              />
            </div>
          </div>
        </div>
        <div className="mb-5 mt-4 flex-grow px-4">
          <label
            htmlFor="start"
            className="mb-2 block pl-1 text-xl font-medium text-gray-900"
          >
            What is the total strength of your company?
          </label>

          <div className="flex pl-2">
            <div className="me-4 flex items-center">
              <input
                id="inline-radio"
                type="radio"
                value=""
                name="inline-radio-group"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 "
              />
              <label
                htmlFor="inline-radio"
                className="text-md ms-2 font-medium text-gray-900 "
              >
                1 - 100
              </label>
            </div>
            <div className="me-4 flex items-center">
              <input
                id="inline-radio"
                type="radio"
                value=""
                name="inline-radio-group"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 "
              />
              <label
                htmlFor="inline-radio"
                className="text-md ms-2 font-medium text-gray-900 "
              >
                100 - 500
              </label>
            </div>
            <div className="me-4 flex items-center">
              <input
                id="inline-radio"
                type="radio"
                value=""
                name="inline-radio-group"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 "
              />
              <label
                htmlFor="inline-radio"
                className="text-md ms-2 font-medium text-gray-900 "
              >
                500 - 1000
              </label>
            </div>
            <div className="me-4 flex items-center">
              <input
                id="inline-radio"
                type="radio"
                value=""
                name="inline-radio-group"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 "
              />
              <label
                htmlFor="inline-radio"
                className="text-md ms-2 font-medium text-gray-900 "
              >
                1000+
              </label>
            </div>
          </div>
        </div>
        <div className=" pb-2 pl-4 pt-5 text-xl font-medium">
          Office Address <span className="text-red-500">*</span>
        </div>
        <div>
          <div className="mt-4 flex w-[100%] gap-5  pl-4 pr-5 ">
            <div className="mb-5 flex-grow">
              <label
                htmlFor="address"
                className="text-md mb-2 block  min-w-[50%] pl-1 font-medium text-gray-900"
              >
                Street Address
              </label>
              <input
                type="text"
                id="name"
                className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter street adress"
              />
            </div>
            <div className="mb-5 flex-grow">
              <label
                htmlFor="year"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                House Number
              </label>
              <input
                type="number"
                id="number"
                className="dark block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter house number"
              />
            </div>
            <div className="mb-5 flex-grow">
              <label
                htmlFor="year"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                Zip Code
              </label>
              <input
                type="number"
                id="number"
                className="dark block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter zip code"
              />
            </div>
          </div>
        </div>
        <div className="pl-4">
          <div className="mt-4 flex w-[100%]  gap-5 pr-5 ">
            <div className="mb-5 flex-grow">
              <label
                htmlFor="address"
                className="text-md mb-2 block pl-1 font-medium text-gray-900"
              >
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter your city"
              />
            </div>
            <div className="mb-5 flex-grow">
              <label
                htmlFor="year"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="number"
                className="dark block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter your state"
              />
            </div>
          </div>
        </div>
        <div className="mb-5 max-w-[50%] flex-grow pl-4 ">
          <label
            htmlFor="address"
            className="text-md mb-2 block max-w-[50%] pl-1 font-medium text-gray-900"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            placeholder="Enter your country"
          />
        </div>
      </div>

      <div className="  rounded-lg bg-white pb-4 shadow-md">
        <div className="border-b border-slate-200 pb-2 pl-4 pt-5 text-xl font-medium">
          Education
        </div>
        <div className="pl-4">
          <div className="mt-4 flex w-[100%]  gap-5 pr-5 ">
            <div className="mb-5 flex-grow">
              <label
                htmlFor="address"
                className="text-md mb-2 block pl-1 font-medium text-gray-900"
              >
                Education Institution <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="ed"
                className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter your institute name"
              />
            </div>
            <div className="mb-5 flex-grow">
              <label
                htmlFor="year"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                Education <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="number"
                className="dark block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter your education"
              />
            </div>
          </div>
        </div>
        <div className="flex cursor-pointer items-center gap-2 pl-4 font-semibold">
          <span className="rounded-full bg-[#D7E8F6] p-2 text-xl font-bold text-[#4D7DAD]">
            <PlusCircledIcon />
          </span>
          <span className="text-lg text-[#4D7DAD]">
            Add Education Institution
          </span>
        </div>
        <div className="flex w-[100%] justify-end pr-5">
          <span className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
            Save Changes
          </span>
        </div>
      </div>

      <div className="  rounded-lg bg-white pb-4 shadow-md">
        <div className="border-b border-slate-200 pb-2 pl-4 pt-5 text-xl font-medium">
          Social Links
        </div>
        <div className="pl-4">
          <div className="mt-4 flex w-[100%]  gap-5 pr-5 ">
            <div className="mb-5 flex-grow">
              <label
                htmlFor="address"
                className="text-md mb-2 block pl-1 font-medium text-gray-900"
              >
                Linkedin
              </label>
              <input
                type="text"
                id="name"
                className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter link"
              />
            </div>
            <div className="mb-5 flex-grow">
              <label
                htmlFor="year"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                Twitter
              </label>
              <input
                type="text"
                id="number"
                className="dark block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter link"
              />
            </div>
          </div>
        </div>
        <div className="mb-5 max-w-[50%] flex-grow pl-4 ">
          <label
            htmlFor="address"
            className="text-md mb-2 block max-w-[50%] pl-1 font-medium text-gray-900"
          >
            Github
          </label>
          <input
            type="text"
            id="name"
            className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            placeholder="Enter link"
          />
        </div>
        <div className="flex cursor-pointer items-center gap-2 pl-4 font-semibold">
          <span className="rounded-full bg-[#D7E8F6] p-2 text-xl font-bold text-[#4D7DAD]">
            <PlusCircledIcon />
          </span>
          <span className="text-lg text-[#4D7DAD]">Add Social Link</span>
        </div>
      </div>
      <div className="rounded-lg bg-white pb-4 shadow-md">
        <div className="border-b border-slate-200 pb-2 pl-4 pt-5 text-xl font-medium">
          Project Area of Interest <span className="text-red-500">*</span>
        </div>
        <div className="pl-4">
          <div className="mt-4 flex w-[100%]  gap-5 pr-5 ">
            <div className="mb-5 flex-grow">
              <label
                htmlFor="currency"
                className="text-md mb-2 block pl-1 font-medium text-gray-900"
              >
                Area <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="area"
                className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter area of interest"
              />
            </div>
            <div className="mb-5 flex-grow">
              <label
                htmlFor="rate"
                className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
              >
                Skills <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="skills"
                className="dark block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter skills: comma separated"
              />
            </div>
          </div>
          <div className="mt-4 flex w-[100%]  gap-5 pr-5 ">
            <div className="mb-5 flex-grow">
              <label
                htmlFor="currency"
                className="text-md mb-2 block pl-1 font-medium text-gray-900"
              >
                Tools <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="skills"
                className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter tools: comma separated"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PaymentSection = () => {
  const user = useUser();
  const [mobile, setMobile] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
  };
  return (
    <>
      <div className="rounded-lg bg-white  shadow-md">
        <div className="border-b border-slate-200 pb-2 pl-4 pt-5 text-xl font-medium">
          Availability
        </div>
        <div className="pl-4">
          <div className="mb-5 mt-4 max-w-[50%] flex-grow pr-4">
            <label
              htmlFor="currency"
              className="text-md mb-2 block pl-1 font-medium text-gray-900"
            >
              Preferred working time zone{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="skills"
              className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="Enter time zone"
            />
          </div>
        </div>
        <div className="flex max-w-[50%] pl-4">
          <div className="mb-5 mt-4 flex-grow pr-4">
            <label
              htmlFor="start"
              className="mb-2 block pl-1 text-xl font-medium text-gray-900"
            >
              Which working days of the week are you available?
            </label>

            <div className="flex pl-4">
              <div className="me-4 flex items-center">
                <input
                  id="inline-checkbox"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="inline-checkbox"
                  className="text-md ms-2  font-medium text-gray-900"
                >
                  Mon
                </label>
              </div>
              <div className="flex">
                <div className="me-4 flex items-center">
                  <input
                    id="inline-checkbox"
                    type="checkbox"
                    value=""
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="inline-checkbox"
                    className="text-md ms-2  font-medium text-gray-900"
                  >
                    Tue
                  </label>
                </div>
              </div>
              <div className="flex">
                <div className="me-4 flex items-center">
                  <input
                    id="inline-checkbox"
                    type="checkbox"
                    value=""
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="inline-checkbox"
                    className="text-md ms-2  font-medium text-gray-900"
                  >
                    Wed
                  </label>
                </div>
              </div>
              <div className="flex">
                <div className="me-4 flex items-center">
                  <input
                    id="inline-checkbox"
                    type="checkbox"
                    value=""
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="inline-checkbox"
                    className="text-md ms-2  font-medium text-gray-900"
                  >
                    Thu
                  </label>
                </div>
              </div>
              <div className="flex">
                <div className="me-4 flex items-center">
                  <input
                    id="inline-checkbox"
                    type="checkbox"
                    value=""
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="inline-checkbox"
                    className="text-md ms-2  font-medium text-gray-900"
                  >
                    Fri
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-w-[50%] pl-4">
          <div className="mb-5 mt-4 flex-grow pr-4">
            <label
              htmlFor="start"
              className="text-md mb-2 block pl-1 font-medium text-gray-900"
            >
              Select start time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="start"
              className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="Enter start time"
            />
          </div>
          <div className="mb-5 mt-4 flex-grow pr-4">
            <label
              htmlFor="end"
              className="text-md mb-2 block pl-1 font-medium text-gray-900"
            >
              Select end time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="end"
              className="dark block w-full flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="Enter end time"
            />
          </div>
        </div>

        <div className="flex max-w-[50%] pl-4">
          <div className="mb-5 mt-4 flex-grow pr-4">
            <label
              htmlFor="start"
              className="mb-2 block pl-1 text-xl font-medium text-gray-900"
            >
              Which days of the weekend are you available?
            </label>

            <div className="flex pl-4">
              <div className="me-4 flex items-center">
                <input
                  id="inline-checkbox"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="inline-checkbox"
                  className="text-md ms-2  font-medium text-gray-900"
                >
                  Sun
                </label>
              </div>
              <div className="me-4 flex items-center">
                <input
                  id="inline-checkbox"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="inline-checkbox"
                  className="text-md ms-2  font-medium text-gray-900"
                >
                  Sat
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white  shadow-md">
        <div className="border-b border-slate-200 pb-2 pl-4 pt-5 text-xl font-medium">
          Payments
        </div>
        <div className="mb-5 flex-grow px-4 mt-4">
          <label
            htmlFor="address"
            className="text-md mb-2 block pl-1 font-medium text-gray-900"
          >
            Currency Prefrence <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="ed"
            className="dark block w-[20%] flex-grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            placeholder="Enter currency"
          />
        </div>
      </div>
    </>
  );
};