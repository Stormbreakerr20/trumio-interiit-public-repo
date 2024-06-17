import { ArrowLeftIcon, ChevronLeftIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import * as Progress from '@radix-ui/react-progress'
import { Badge, Callout, Checkbox, TextArea, TextField } from "@radix-ui/themes";
import skills_arr from './skills.json'
import tools_arr from './tools.json'
import Select from 'react-select'
import { api } from "~/utils/api";
import Loading from "~/components/Loading";
import { useRouter } from "next/router";

enum CreateProjectStateEnum {
  REQUIREMENTS,
  LISTING,
  PREVIEW,
  INVITE
}

// This is really stupid. Thanks, I love it.
const timezones: [string, ...string[]] = [
  "Asia/Kolkata (IST)",
  "America/Chicago (CST)",
  "America/Denver (MST)",
  "America/Los_Angeles (PST)",
  "America/New_York (EST)",
  "America/Anchorage (AKST)",
  "Pacific/Honolulu (HST)"
]

const countryOptions = ["India", "United Kingdom", "United States", "Canada"].map((country) => ({ label: country, value: country }))

interface WorkingWeekdaysType {
  mon: boolean,
  tue: boolean,
  wed: boolean,
  thu: boolean,
  fri: boolean
}

interface WorkingWeekendsType {
  sat: boolean,
  sun: boolean
}


export default function CreateProject() {

  const [createProjectState, setCreateProjectState] = useState<CreateProjectStateEnum>(CreateProjectStateEnum.REQUIREMENTS);
  const progress = createProjectState === CreateProjectStateEnum.REQUIREMENTS ? 25 :
    createProjectState === CreateProjectStateEnum.LISTING ? 50 :
      createProjectState === CreateProjectStateEnum.PREVIEW ? 75 :
        createProjectState === CreateProjectStateEnum.INVITE ? 100 : 0;

  const [projectName, setProjectName] = useState<string>("")
  const [duration, setDuration] = useState<number>(0)
  const [durationUnits, setDurationUnits] = useState<string>("weeks")
  const [description, setDescription] = useState<string>("")

  const [timezone, setTimezone] = useState<string>(timezones[0])
  const [timeOverlap, setTimeOverlap] = useState<number>(0)


  const [weekdays, setWeekdays] = useState<boolean>(true)
  const [weekends, setWeekends] = useState<boolean>(false)

  const [weekdayStartHour, setWeekdayStartHour] = useState<number>(9)
  const [weekdayEndHour, setWeekdayEndHour] = useState<number>(17)
  const [weekendStartHour, setWeekendStartHour] = useState<number>(9)
  const [weekendEndHour, setWeekendEndHour] = useState<number>(17)

  const [workingWeekdays, setWorkingWeekdays] = useState<WorkingWeekdaysType>({ mon: true, tue: true, wed: true, thu: true, fri: true })
  const [workingWeekends, setWorkingWeekends] = useState<WorkingWeekendsType>({ sat: false, sun: false })

  const [skills, setSkills] = useState([])
  const [tools, setTools] = useState([])

  const [countries, setCountries] = useState<string[]>([])
  const [isIncluding, setIsIncluding] = useState<boolean>(true)

  const [isListingDurationDates, setIsListingDurationDates] = useState<boolean>(true)
  const [listingDurationStartDate, setListingDurationStartDate] = useState<string>("")
  const [listingDurationEndDate, setListingDurationEndDate] = useState<string>("")
  const [listingDurationInDays, setListingDurationInDays] = useState<number>(0)



  return (
    <div className="flex flex-col mx-5 gap-5 pb-[300px]">
      <div className="flex flex-row items-center gap-2 mt-5">
        <div className="bg-sky-600 text-white p-2 rounded-[100%]">
          <ArrowLeftIcon className="scale-[150%]" />
        </div>
        <div className="text-sky-600">Create Project</div>
      </div>
      <div className="flex flex-col md:gap-[90px] ml-5 md:flex-row">
        <button className="flex flex-row items-center">
          <div className={createProjectState === CreateProjectStateEnum.REQUIREMENTS ? "bg-sky-500 text-white" : "bg-gray-100 text-slate-600" + " p-2 flex f rounded-full"}>
            <svg className="scale-[150%]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div className={"flex flex-col items-start m-2 " + (createProjectState === CreateProjectStateEnum.REQUIREMENTS ? "text-sky-500" : "text-gray-400")}>
            <div className="text-sm font-semibold">Requirements</div>
            <div className="text-xs">Project Details</div>

          </div>
        </button>
        <button className="flex flex-row items-center">
          <div className={createProjectState === CreateProjectStateEnum.LISTING ? "bg-sky-500 text-white" : "bg-gray-100 text-slate-600" + " p-2 flex f rounded-full"}>
            <svg className="scale-[150%]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <div className={"flex flex-col items-start m-2 " + (createProjectState === CreateProjectStateEnum.LISTING ? "text-sky-500" : "text-gray-400")}>
            <div className="text-sm font-semibold">Listing</div>
            <div className="text-xs">Duration</div>

          </div>
        </button>
        <button className="flex flex-row items-center">
          <div className={createProjectState === CreateProjectStateEnum.PREVIEW ? "bg-sky-500 text-white" : "bg-gray-100 text-slate-600" + " p-2 flex f rounded-full"}>
            <svg className="scale-[150%]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div className={"flex flex-col items-start m-2 " + (createProjectState === CreateProjectStateEnum.PREVIEW ? "text-sky-500" : "text-gray-400")}>
            <div className="text-sm font-semibold">Preview</div>
            <div className="text-xs">Summary</div>

          </div>
        </button>
        <button className="flex flex-row items-center">
          <div className={createProjectState === CreateProjectStateEnum.INVITE ? "bg-sky-500 text-white" : "bg-gray-100 text-slate-600" + " p-2 flex f rounded-full"}>
            <svg className="scale-[150%]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          </div>
          <div className={"flex flex-col items-start m-2 " + (createProjectState === CreateProjectStateEnum.INVITE ? "text-sky-500" : "text-gray-400")}>
            <div className="text-sm font-semibold">Invite</div>
            <div className="text-xs">Talent</div>
          </div>
        </button>
      </div>
      <div>
        <Progress.Root
          className="relative overflow-hidden bg-sky-600 rounded-full max-w-[80vw] md:w-[700px] h-[10px]"
          style={{
            // Fix overflow clipping in Safari
            // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
            transform: 'translateZ(0)',
          }}
        >
          <Progress.Indicator
            className="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
            style={{ transform: `translateX(${progress}%)` }}
          />
        </Progress.Root>
      </div>

      <div className="max-w-[1000px]">

        {
          createProjectState === CreateProjectStateEnum.REQUIREMENTS ?
            <CreateProjectForm state={{
              projectName,
              setProjectName,
              duration,
              setDuration,
              durationUnits,
              setDurationUnits,
              description,
              setDescription,
              timezone,
              setTimezone,
              timeOverlap,
              setTimeOverlap,
              weekdays,
              setWeekdays,
              weekends,
              setWeekends,
              weekdayStartHour,
              setWeekdayStartHour,
              weekdayEndHour,
              setWeekdayEndHour,
              weekendStartHour,
              setWeekendStartHour,
              weekendEndHour,
              setWeekendEndHour,
              workingWeekdays,
              setWorkingWeekdays,
              workingWeekends,
              setWorkingWeekends,
              skills, tools, setSkills, setTools, countries, setCountries, isIncluding, setIsIncluding, setCreateProjectState
            }} />

            : null
        }

        {
          createProjectState === CreateProjectStateEnum.LISTING ?
            <ListingDetail state={{
              setCreateProjectState, 
              isListingDurationDates, 
              setIsListingDurationDates,
              listingDurationStartDate,
              setListingDurationStartDate,
              listingDurationEndDate,
              setListingDurationEndDate,
              listingDurationInDays,
              setListingDurationInDays
            }} /> : null
        }

        {
          createProjectState === CreateProjectStateEnum.PREVIEW ?
            <Preview state={{ 
              projectName, 
              setCreateProjectState, 
              duration, 
              durationUnits, 
              description, 
              timezone,
              timeOverlap,
              weekdays,
              weekends,
              weekdayStartHour,
              weekdayEndHour,
              weekendStartHour,
              weekendEndHour,
              workingWeekdays,
              workingWeekends,
              skills,
              tools,
              countries,
              isIncluding,
              listingDurationStartDate,
              isListingDurationDates,
              listingDurationEndDate,
              listingDurationInDays 
            }} /> : null
        }

      </div>



    </div>
  )
}


interface ProjectState {
  projectName: string;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  durationUnits: string;
  setDurationUnits: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  timezone: string;
  setTimezone: React.Dispatch<React.SetStateAction<string>>;
  timeOverlap: number | undefined;
  setTimeOverlap: React.Dispatch<React.SetStateAction<number | undefined>>;
  weekdays: boolean;
  setWeekdays: React.Dispatch<React.SetStateAction<boolean>>;
  weekends: boolean;
  setWeekends: React.Dispatch<React.SetStateAction<boolean>>;
  weekdayStartHour: number;
  setWeekdayStartHour: React.Dispatch<React.SetStateAction<number>>;
  weekdayEndHour: number;
  setWeekdayEndHour: React.Dispatch<React.SetStateAction<number>>;
  weekendStartHour: number;
  setWeekendStartHour: React.Dispatch<React.SetStateAction<number>>;
  weekendEndHour: number;
  setWeekendEndHour: React.Dispatch<React.SetStateAction<number>>;
  workingWeekdays: WorkingWeekdaysType;
  setWorkingWeekdays: React.Dispatch<React.SetStateAction<WorkingWeekdaysType>>;
  workingWeekends: WorkingWeekendsType;
  setWorkingWeekends: React.Dispatch<React.SetStateAction<WorkingWeekendsType>>;
  skills: any[],
  tools: any[],
  setSkills: React.Dispatch<React.SetStateAction<any[]>>,
  setTools: React.Dispatch<React.SetStateAction<any[]>>,
  countries: string[],
  setCountries: React.Dispatch<React.SetStateAction<string[]>>,
  isIncluding: boolean,
  setIsIncluding: React.Dispatch<React.SetStateAction<boolean>>,
  setCreateProjectState: React.Dispatch<React.SetStateAction<CreateProjectStateEnum>>
}

const CreateProjectForm = ({
  state: {
    projectName,
    setProjectName,
    duration,
    setDuration,
    durationUnits,
    setDurationUnits,
    description,
    setDescription,
    timezone,
    setTimezone,
    timeOverlap,
    setTimeOverlap,
    weekdays,
    setWeekdays,
    weekends,
    setWeekends,
    weekdayStartHour,
    setWeekdayStartHour,
    weekdayEndHour,
    setWeekdayEndHour,
    weekendStartHour,
    setWeekendStartHour,
    weekendEndHour,
    setWeekendEndHour,
    workingWeekdays,
    setWorkingWeekdays,
    workingWeekends,
    setWorkingWeekends,
    setSkills,
    setTools,
    countries,
    setCountries,
    isIncluding,
    setIsIncluding,
    setCreateProjectState
  }
}: { state: ProjectState }) => {
  return (
    <>
      <div className="bg-white flex flex-col gap-5 rounded-lg">
        <div className="px-4 py-3 border-b border-slate-300 flex flex-row items-center justify-between">
          <div>Project Details</div>
          <button className="px-3 py-2 bg-sky-600 text-white rounded-lg">
            AI Assist
          </button>
        </div>
        <div className="flex mx-3 mt-4 flex-col flex-grow">
          <div className="text-xs ml-1 font-light mb-1">
            Project Name <span className="text-red-400">*</span>
          </div>
          <TextField.Root className="flex-grow">
            <TextField.Slot>
            </TextField.Slot>
            <TextField.Input value={projectName} onChange={(event) => { setProjectName((event.target as HTMLInputElement).value) }} className="px-2" placeholder="Project Name" />
          </TextField.Root>
        </div>
        <div className="flex mx-3 mt-2 flex-row flex-grow gap-2 items-center">
          <div className="flex flex-col flex-grow">
            <div className="text-xs ml-1 font-light mb-1">
              Expected Duration <span className="text-red-400">*</span>
            </div>
            <TextField.Root className="flex-grow">
              <TextField.Slot>
              </TextField.Slot>
              <TextField.Input type="number" value={duration} onChange={(event) => { setDuration(parseInt((event.target as HTMLInputElement).value)) }} className="px-2" placeholder="Enter Duration" />
            </TextField.Root>
          </div>
          <div className="flex flex-col flex-grow">
            <div className="text-xs ml-1 font-light mb-1">
              Units <span className="text-red-400">*</span>
            </div>
            <select value={durationUnits} onChange={(event) => { setDurationUnits((event.target as HTMLSelectElement).value) }}
              className="bg-white text-slate-400 text-sm outline-1 flex-grow px-2 py-1 border-gray-300 border rounded focus:border-2 focus:border-blue-400 outline-none"
            >
              <option value="weeks">Weeks</option>
              <option value="days">Days</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col mx-3 justify-center items-start mt-2 flex-grow">
          <div className="text-xs ml-1 font-light mb-1">
            Project Description <span className="text-red-400">*</span>
          </div>
          <TextArea value={description} onChange={(event) => { setDescription((event.target as HTMLTextAreaElement).value) }} className="w-full flex flex-grow" placeholder="Reply to comment…" />
        </div>
        <div className="flex flex-col mx-3 justify-center items-start mt-2 flex-grow">
          <div className="text-xs ml-1 font-light mb-1">
            Upload detailed requirements document (optional) <span className="text-red-400">*</span>
          </div>
          <div className="w-full border-2 border-sky-500 h-[170px] border-dashed flex justify-center items-center">
            <div className="flex flex-col gap-2 text-sky-500 text-center">
              <div className="font-medium">Drop files here or click to upload</div>
              <div className="font-light text-sm">(Drag your files here or click to browse and select files for upload)</div>
            </div>
          </div>
        </div>

      </div>
      <div className="bg-white flex flex-col rounded-lg">
        <div className="px-4 py-4 border-b border-slate-300 flex flex-row items-center justify-between">
          <div>Availability</div>
        </div>
        <div className="flex flex-col flex-grow mx-2 mt-4">
          <div className="text-xs ml-1 font-light mb-1">
            Preferred time zone<span className="text-red-400">*</span>
          </div>
          <select value={timezone} onChange={(event) => { setTimezone((event.target as HTMLSelectElement).value) }}
            className="bg-white text-slate-400 text-sm outline-1 flex-grow px-2 py-1 border-gray-300 border rounded focus:border-2 focus:border-blue-400 outline-none"
          >
            {
              timezones.map((timezone) => <option key={timezone} value={timezone}>{timezone}</option>)
            }
          </select>
        </div>
        <div className="flex mx-3 mt-4 flex-col flex-grow">
          <div className="text-xs ml-1 font-light mb-1">
            Desired Time Overlap <span className="text-red-400">*</span>
          </div>
          <TextField.Root className="flex-grow">
            <TextField.Slot>
            </TextField.Slot>
            <TextField.Input value={timeOverlap} onChange={(event) => { setTimeOverlap(parseInt((event.target as HTMLInputElement).value)) }} className="px-2" placeholder="Enter no of hours..." />
          </TextField.Root>
        </div>
        <div className="flex flex-col mt-4 mx-3 text-slate-600">
          <div className="font-medium text-sm">Days Available</div>
          <div className="flex flex-row gap-4 my-2">
            <div className="flex flex-row items-center gap-2">
              <Checkbox checked={weekdays} onClick={() => { setWeekdays(!weekdays) }}
                className={weekdays ? "bg-blue-500 text-white" : "" + " shadow-md outline-none"} variant="classic"
              />
              <div className="font-medium text-sm">Weekdays</div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Checkbox checked={weekends} onClick={() => { setWeekends(!weekends) }}
                className={weekends ? "bg-blue-500 text-white" : "" + " shadow-md outline-none"} variant="classic"
              />
              <div className="font-medium text-sm">Weekends</div>
            </div>
          </div>
        </div>
        {
          weekdays &&
          <>
            <div className="flex flex-row items-center gap-4 mt-2 mx-3">
              <div className="font-medium text-sm">Weekdays:</div>
              <div className="text-xs border-b border-gray-500">{timezone}</div>
            </div>
            <div className="flex flex-row items-center gap-4 mt-2 mx-3 flex-grow">
              <div className="flex flex-col flex-grow">
                <div className="text-xs ml-1 font-light mb-1">
                  Start time<span className="text-red-400">*</span>
                </div>
                <select value={weekdayStartHour} onChange={(event) => { setWeekdayStartHour(parseInt((event.target as HTMLSelectElement).value)) }}
                  className="bg-white text-slate-400 text-sm outline-1 flex-grow px-2 py-1 border-gray-300 border rounded focus:border-2 focus:border-blue-400 outline-none"
                >
                  {
                    Array.from(Array(24).keys()).map((hour) => <option key={hour} value={hour}>{`${hour < 9 ? '0' + hour.toString() : hour}:00`}</option>)
                  }
                </select>
              </div>
              <div className="flex flex-col flex-grow">
                <div className="text-xs ml-1 font-light mb-1">
                  End time<span className="text-red-400">*</span>
                </div>
                <select value={weekdayEndHour} onChange={(event) => { setWeekdayEndHour(parseInt((event.target as HTMLSelectElement).value)) }}
                  className="bg-white text-slate-400 text-sm outline-1 flex-grow px-2 py-1 border-gray-300 border rounded focus:border-2 focus:border-blue-400 outline-none"
                >
                  {
                    Array.from(Array(24).keys()).map((hour) => <option key={hour} value={hour}>{`${hour < 9 ? '0' + hour.toString() : hour}:00`}</option>)
                  }
                </select>
              </div>
            </div>
            <div className="flex flex-col mt-4 mx-3 text-slate-600">
              <div className="font-medium text-sm">Which days?</div>
              <div className="flex flex-row gap-4 my-2">

                <div className="flex flex-row items-center gap-2">
                  <Checkbox checked={workingWeekdays.mon} onClick={() => {
                    const newWorkingWeek = { ...workingWeekdays }
                    newWorkingWeek.mon = !newWorkingWeek.mon
                    setWorkingWeekdays(newWorkingWeek)
                  }}
                    className={workingWeekdays.mon ? "bg-blue-500 text-white" : "" + " shadow-md outline-none"} variant="classic"
                  />
                  <div className="font-medium text-sm">Mon</div>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Checkbox checked={workingWeekdays.tue} onClick={() => {
                    const newWorkingWeek = { ...workingWeekdays }
                    newWorkingWeek.tue = !newWorkingWeek.tue
                    setWorkingWeekdays(newWorkingWeek)
                  }}
                    className={workingWeekdays.tue ? "bg-blue-500 text-white" : "" + " shadow-md outline-none"} variant="classic"
                  />
                  <div className="font-medium text-sm">Tue</div>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Checkbox checked={workingWeekdays.wed} onClick={() => {
                    const newWorkingWeek = { ...workingWeekdays }
                    newWorkingWeek.wed = !newWorkingWeek.wed
                    setWorkingWeekdays(newWorkingWeek)
                  }}
                    className={workingWeekdays.wed ? "bg-blue-500 text-white" : "" + " shadow-md outline-none"} variant="classic"
                  />
                  <div className="font-medium text-sm">Wed</div>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Checkbox checked={workingWeekdays.thu} onClick={() => {
                    const newWorkingWeek = { ...workingWeekdays }
                    newWorkingWeek.thu = !newWorkingWeek.thu
                    setWorkingWeekdays(newWorkingWeek)
                  }}
                    className={workingWeekdays.thu ? "bg-blue-500 text-white" : "" + " shadow-md outline-none"} variant="classic"
                  />
                  <div className="font-medium text-sm">Thu</div>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Checkbox checked={workingWeekdays.fri} onClick={() => {
                    const newWorkingWeek = { ...workingWeekdays }
                    newWorkingWeek.fri = !newWorkingWeek.fri
                    setWorkingWeekdays(newWorkingWeek)
                  }}
                    className={workingWeekdays.fri ? "bg-blue-500 text-white" : "" + " shadow-md outline-none"} variant="classic"
                  />
                  <div className="font-medium text-sm">Fri</div>
                </div>

              </div>
            </div>
          </>
        }
        {
          weekends &&
          <>
            <div className="flex flex-row items-center gap-4 mt-2 mx-3">
              <div className="font-medium text-sm">Weekends:</div>
              <div className="text-xs border-b border-gray-500">{timezone}</div>
            </div>
            <div className="flex flex-row items-center gap-4 mt-2 mx-3 flex-grow">
              <div className="flex flex-col flex-grow">
                <div className="text-xs ml-1 font-light mb-1">
                  Start time<span className="text-red-400">*</span>
                </div>
                <select value={weekendStartHour} onChange={(event) => { setWeekendStartHour(parseInt((event.target as HTMLSelectElement).value)) }}
                  className="bg-white text-slate-400 text-sm outline-1 flex-grow px-2 py-1 border-gray-300 border rounded focus:border-2 focus:border-blue-400 outline-none"
                >
                  {
                    Array.from(Array(24).keys()).map((hour) => <option key={hour} value={hour}>{`${hour < 9 ? '0' + hour.toString() : hour}:00`}</option>)
                  }
                </select>
              </div>
              <div className="flex flex-col flex-grow">
                <div className="text-xs ml-1 font-light mb-1">
                  End time<span className="text-red-400">*</span>
                </div>
                <select value={weekendEndHour} onChange={(event) => { setWeekendEndHour(parseInt((event.target as HTMLSelectElement).value)) }}
                  className="bg-white text-slate-400 text-sm outline-1 flex-grow px-2 py-1 border-gray-300 border rounded focus:border-2 focus:border-blue-400 outline-none"
                >
                  {
                    Array.from(Array(24).keys()).map((hour) => <option key={hour} value={hour}>{`${hour < 9 ? '0' + hour.toString() : hour}:00`}</option>)
                  }
                </select>
              </div>
            </div>
            <div className="flex flex-col mt-4 mx-3 text-slate-600">
              <div className="font-medium text-sm">Which days?</div>
              <div className="flex flex-row gap-4 my-2">

                <div className="flex flex-row items-center gap-2">
                  <Checkbox checked={workingWeekends.sat} onClick={() => {
                    const newWorkingWeek = { ...workingWeekends }
                    newWorkingWeek.sat = !newWorkingWeek.sat
                    setWorkingWeekends(newWorkingWeek)
                  }}
                    className={workingWeekends.sat ? "bg-blue-500 text-white" : "" + " shadow-md outline-none"} variant="classic"
                  />
                  <div className="font-medium text-sm">Sat</div>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <Checkbox checked={workingWeekends.sun} onClick={() => {
                    const newWorkingWeek = { ...workingWeekends }
                    newWorkingWeek.sun = !newWorkingWeek.sun
                    setWorkingWeekends(newWorkingWeek)
                  }}
                    className={workingWeekends.sun ? "bg-blue-500 text-white" : "" + " shadow-md outline-none"} variant="classic"
                  />
                  <div className="font-medium text-sm">Sun</div>
                </div>

              </div>
            </div>
          </>
        }


      </div>
      <div className="bg-white flex flex-col rounded-lg pb-5">
        <div className="px-4 py-4 border-b border-slate-300 flex flex-row items-center justify-between">
          <div>Technical Requirements</div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex mx-3 mt-4 flex-col flex-grow">
            <div className="text-xs ml-1 font-light mb-1">
              Skills <span className="text-red-400">*</span> (Top 5)
            </div>
            <Select onChange={(options) => { setSkills(options.map(option => option.value)) }}
              isMulti className="my-2" placeholder={"Select any 5 skills"} options={skills_arr.map((el) => ({ label: el.name, value: el }))} />
          </div>
          <div className="flex mx-3 mt-4 flex-col flex-grow">
            <div className="text-xs ml-1 font-light mb-1">
              Tools <span className="text-red-400">*</span> (Top 5)
            </div>
            <Select onChange={(options) => { setTools(options.map(option => option.value)) }}
              isMulti className="my-2" placeholder={"Select any 5 skills"} options={tools_arr.map((el) => ({ label: el.name, value: el }))} />
          </div>

        </div>
      </div>

      <div className="bg-white flex flex-col rounded-lg pb-5">
        <div className="px-4 py-4 border-b border-slate-300 flex flex-row items-center justify-between">
          <div>Country - Inclusions and Exclusions (Optional)</div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex flex-row mx-4">
            <input checked={isIncluding} onChange={() => { setIsIncluding(!isIncluding) }} type="radio" />
            <div className="flex mx-3 mt-4 flex-col flex-grow">
              <div className="text-xs ml-1 font-light mb-1">
                Included Countries <span className="text-red-400">*</span>
              </div>
              <Select value={isIncluding ? countries.map((country) => ({ label: country, value: country })) : null} onChange={(options) => { setCountries(options.map(option => option.value)) }}
                isMulti className="my-2" placeholder={"Select country to include"} options={countryOptions}
                isDisabled={!isIncluding}
              />
            </div>
          </div>
          <div className="flex flex-row mx-4">
            <input checked={!isIncluding} onChange={() => { setIsIncluding(!isIncluding) }} type="radio" name="" id="" />
            <div className="flex mx-3 mt-4 flex-col flex-grow">
              <div className="text-xs ml-1 font-light mb-1">
                Excluded Countries <span className="text-red-400">*</span>
              </div>
              <Select value={!isIncluding ? countries : null} onChange={(options) => { setCountries(options) }}
                isMulti className="my-2" placeholder={"Select country to exclude"} options={countryOptions}
                isDisabled={isIncluding}
              />
            </div>
          </div>

        </div>

      </div>
      <div className="flex flex-row justify-end ">
        <div className="px-4 py-2 m-3 bg-sky-500 rounded-lg text-sm text-white">
          <button onClick={() => { setCreateProjectState(CreateProjectStateEnum.LISTING) }}>Save & Continue</button>
        </div>
      </div>
    </>
  )
}

interface ListingDetailProps {
  state: {
    setCreateProjectState: React.Dispatch<React.SetStateAction<CreateProjectStateEnum>>,
    isListingDurationDates: boolean,
    setIsListingDurationDates: React.Dispatch<React.SetStateAction<boolean>>,
    listingDurationStartDate: string,
    setListingDurationStartDate: React.Dispatch<React.SetStateAction<string>>,
    listingDurationEndDate: string,
    setListingDurationEndDate: React.Dispatch<React.SetStateAction<string>>,
    listingDurationInDays: number,
    setListingDurationInDays: React.Dispatch<React.SetStateAction<number>>
  }
}

const ListingDetail = ({ state: {
    setCreateProjectState,
    isListingDurationDates,
    setIsListingDurationDates,
    listingDurationStartDate,
    setListingDurationStartDate,
    listingDurationEndDate,
    setListingDurationEndDate,
    listingDurationInDays,
    setListingDurationInDays 
} }: ListingDetailProps) => {
  return (
    <>
      <div className="bg-white flex flex-col gap-5 rounded-lg pb-10">
        <div className="px-4 py-3 border-b border-slate-300 flex flex-row items-center justify-start">
          <div>Listing Details</div>
        </div>
        <div className="flex flex-col flex-grow mx-3">
          <div className="flex flex-col flex-grow gap-4">
            <div className="flex flex-row gap-4 items-center">
              <input type="radio" checked={isListingDurationDates} onChange={(event) => { setIsListingDurationDates((event.target as HTMLInputElement).checked) }} />
              <div className="font-medium text-sm">Select Dates</div>
            </div>
            <div className="flex flex-row flex-grow gap-2">

              <div className="flex flex-col flex-grow">
                <label className="text-sm font-light" htmlFor="start-date">Start Date<span className="text-red-400">*</span></label>
                <input type="date" value={listingDurationStartDate} name="start-date" disabled={!isListingDurationDates} onChange={(event) => { setListingDurationStartDate((event.target as HTMLInputElement).value) }} className="rounded flex flex-grow border border-gray-200 p-2 my-2" />
              </div>

              <div className="flex flex-col flex-grow">
                <label className="text-sm font-light" htmlFor="end-date">End Date<span className="text-red-400">*</span></label>
                <input type="date" value={listingDurationEndDate} name="end-date" disabled={!isListingDurationDates} onChange={(event) => { setListingDurationEndDate((event.target as HTMLInputElement).value) }} className="rounded flex flex-grow border border-gray-200 p-2 my-2" />
              </div>

            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow mx-3">
          <div className="flex flex-row gap-4 items-center">
            <input type="radio" checked={!isListingDurationDates} onChange={(event) => { setIsListingDurationDates(!(event.target as HTMLInputElement).checked) }} />
            <div className="font-medium text-sm">Enter Duration</div>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div>Ends after </div>
            <input type="number" value={listingDurationInDays} onChange={(event) => { setListingDurationInDays(parseInt((event.target as HTMLInputElement).value)) }} disabled={isListingDurationDates} placeholder={"Enter no of days"} className="rounded border border-gray-200 outline-none p-2 my-2" />
            <div>days</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <button onClick={() => { setCreateProjectState(CreateProjectStateEnum.REQUIREMENTS) }} className="outline-none flex flex-row gap-3 items-center text-sky-600">
          <ChevronLeftIcon className="scale-[140%] bg-sky-200 bg-opacity-50 rounded-full" />
          <div>Back</div>
        </button>
        <div className="px-4 py-2 m-3 bg-sky-500 rounded-lg text-sm text-white">
          <button onClick={() => { setCreateProjectState(CreateProjectStateEnum.PREVIEW) }}>Save & Continue</button>
        </div>
      </div>
    </>
  )
}

interface PreviewProps {
  state: {
    projectName: string,
    setCreateProjectState: React.Dispatch<React.SetStateAction<CreateProjectStateEnum>>,
    duration: number,
    durationUnits: string,
    description: string,
    timezone: string,
    timeOverlap: number,
    weekdays: boolean,
    weekends: boolean,
    weekdayStartHour: number,
    weekdayEndHour: number,
    weekendStartHour: number,
    weekendEndHour: number,
    workingWeekdays: WorkingWeekdaysType,
    workingWeekends: WorkingWeekendsType,
    skills: any[],
    tools: any[],
    countries: string[],
    isIncluding: boolean,
    nda: false,
    isListingDurationDates: boolean,
    listingDurationStartDate: string,
    listingDurationEndDate: string,
    listingDurationInDays: number
  }
}

const Preview = ({ state: { 
  projectName, 
  setCreateProjectState, 
  duration, 
  durationUnits, 
  description,
  timezone,
  timeOverlap,
  weekdays,
  weekends,
  weekdayStartHour,
  weekdayEndHour,
  weekendStartHour,
  weekendEndHour,
  workingWeekdays,
  workingWeekends, 
  skills, 
  tools, 
  countries,
  isIncluding,
  nda,
  isListingDurationDates, 
  listingDurationEndDate, 
  listingDurationInDays, 
  listingDurationStartDate
} }: PreviewProps) => {
  const createProjectMutation = api.project.createProject.useMutation()

  const handleCreateProject = () => {
    createProjectMutation.mutate({
      project_name:projectName,
      duration,
      duration_unit: durationUnits,
      description,
      timezone,
      timeOverlap,
      weekdays,
      weekends,
      weekdayStartHour,
      weekdayEndHour,
      weekendStartHour,
      weekendEndHour,
      workingWeekdays,
      workingWeekends,
      skills,
      tools,
      countries,
      isIncluding,
      nda: false

    })
  }

  const router = useRouter()

  useEffect(() => {
    if(createProjectMutation.isSuccess) {
      router.push('/project')
    }
  }, [createProjectMutation.isSuccess, router])

  
  return (
    <>
      <div className="bg-white flex flex-col gap-5 rounded-lg pb-5">
        <div className="px-4 py-3 border-b border-slate-300 flex flex-row items-center justify-start">
          <div className="font-medium">Project Details</div>
        </div>
        <div className="flex flex-col gap-1 mx-4">
          <div className="font-semibold">{projectName}</div>
          <div className="text-sm font-light">Project Name</div>
        </div>
        <div className="flex flex-row flex-grow items-center gap-3 mx-4">
          <div className="flex flex-col gap-1 flex-grow">
            <div className="font-semibold">{duration} {durationUnits}</div>
            <div className="text-sm font-light">Expected Duration</div>
          </div>
          <div className="flex flex-col gap-1 flex-grow">
            <div className="font-semibold">{isListingDurationDates ? `${listingDurationStartDate} - ${listingDurationEndDate}` : `${listingDurationInDays} days`}</div>
            <div className="text-sm font-light">Listing Duration</div>
          </div>
        </div>
        <div className="flex flex-col gap-1 mx-4">
          <div className="font-semibold">US Dollar</div>
          <div className="text-sm font-light">Currency</div>
        </div>
        <div className="flex flex-row flex-grow mx-4">
          <div className="flex flex-col gap-1 flex-grow">
            <div className="font-semibold">Variable</div>
            <div className="text-sm font-light">Payment Type</div>
          </div>
          <div className="flex flex-col gap-1 flex-grow">
            <div className="font-semibold">No</div>
            <div className="text-sm font-light">NDA</div>
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col gap-5 rounded-lg pb-10 mt-5">
        <div className="px-4 py-3 border-b border-slate-300 flex flex-row items-center justify-start">
          <div className="font-medium">Project Description</div>
        </div>
        <div className="flex mx-4 flex-grow text-sm">
          {description}
        </div>
      </div>
      <div className="bg-white flex flex-col gap-5 rounded-lg pb-10 mt-5">
        <div className="px-4 py-3 border-b border-slate-300 flex flex-row items-center justify-start">
          <div className="font-medium">Requirement Details</div>
        </div>
        <div className="flex flex-col gap-3 mx-4">
          <div className="flex flex-col gap-1">
            <div className="font-light">Skills</div>
            <div className="flex flex-row items-center gap-2 wrap flex-wrap">
              {
                skills.map((skill) => <Badge key={skill._id} color="blue">{skill.name}</Badge>)
              }
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-light">Tools</div>
            <div className="flex flex-row items-center gap-2 wrap flex-wrap">
              {
                tools.map((tool) => <Badge key={tool._id} color="blue">{tool.name}</Badge>)
              }
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row mx-4">
        {
          createProjectMutation.error && 
          <Callout.Root color="red">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              { createProjectMutation.error.message }
            </Callout.Text>
          </Callout.Root>
        }
      </div>
      <div className="flex flex-row justify-between">
        <button onClick={() => { setCreateProjectState(CreateProjectStateEnum.LISTING) }} className="outline-none flex flex-row gap-3 items-center text-sky-600">
          <ChevronLeftIcon className="scale-[140%] bg-sky-200 bg-opacity-50 rounded-full" />
          <div>Back</div>
        </button>
        <button className="px-4 py-2 m-3 bg-sky-500 rounded-lg text-sm text-white" onClick={handleCreateProject} disabled={createProjectMutation.isLoading}>
          <div className="flex justify-center items-center"  >{createProjectMutation.isLoading ? <Loading className="stroke-white scale-[75%]"/> : `Post`}</div>
        </button>
      </div>
    </>
  )
}