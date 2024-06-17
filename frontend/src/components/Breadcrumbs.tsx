import HomeIcon from "./icons/HomeIcon"
import { CaretRightIcon } from "@radix-ui/react-icons"

interface BreadcrumbsProps {
  paths: string[]
}

export default function Breadcrumbs({ paths }: BreadcrumbsProps) {
  return (
    <>
      <div className="flex flex-row items-center mt-2 gap-2 font-light text-sm">
        <HomeIcon />
        {
          paths.map((path) => {
            return (
              <div key={path} className="flex items-center">
                <CaretRightIcon />
                <span className="text-slate-800" key={path}>
                  {`${path}`}
                </span>
              </div>
            )
          })
        }
      </div>
    </>
  )
}