import { SignInButton, useUser } from "@clerk/nextjs";
import { MagnifyingGlassIcon, ChatBubbleIcon, BellIcon } from "@radix-ui/react-icons";
import { Avatar } from "@radix-ui/themes";
import { Montserrat } from 'next/font/google'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const mont = Montserrat({ subsets: ['latin'] })

export default function Navbar() {
  const user = useUser()
  const router = useRouter()
  console.log(router.pathname)
  return (
    <>
      <div className={`${mont.className} z-[1000] flex h-[7vh] items-center justify-between px-5 text-gray-600 shadow-md fixed w-[100%] bg-white`}>
        <div className="flex gap-5">
          <div className="flex items-center">
            <span>
              <Image src="/images/Trumio.png" alt="" width={100} height={30} />
            </span>
            <span className="pt-1 text-xs">v0.0.8</span>
          </div>
          <div className="hidden md:flex items-center">
            <ul className="flex gap-[2rem] text-sm">
              <Link href="/dashboard" className={ "hover:text-[#008EBA] hover:border-b-2 hover:border-[#008EBA] cursor-pointer h-[7vh] flex items-center transition-all duration-100 hover:font-semibold box-border " + (router.pathname === '/dashboard' ? ' text-[#008EBA] border-b-2 border-[#008EBA]' : '')}>Dashboard</Link>
              <Link href="/marketplace" className={ "hover:text-[#008EBA] hover:border-b-2 hover:border-[#008EBA] cursor-pointer h-[7vh] flex items-center transition-all duration-100 hover:font-semibold box-border " + (router.pathname === '/marketplace' ? ' text-[#008EBA] border-b-2 border-[#008EBA]' : '')}>Marketplace</Link>
              <Link href="/project" className={ "hover:text-[#008EBA] hover:border-b-2 hover:border-[#008EBA] cursor-pointer h-[7vh] flex items-center transition-all duration-100 hover:font-semibold box-border " + (router.pathname === '/project' ? ' text-[#008EBA] border-b-2 border-[#008EBA]' : '')}>Project</Link>
              <Link href="/my-teams" className={ "hover:text-[#008EBA] hover:border-b-2 hover:border-[#008EBA] cursor-pointer h-[7vh] flex items-center transition-all duration-100 hover:font-semibold box-border " + (router.pathname === '/my-teams' ? ' text-[#008EBA] border-b-2 border-[#008EBA]' : '')}>My Team</Link>
              <Link href="/chat" className={ "hover:text-[#008EBA] hover:border-b-2 hover:border-[#008EBA] cursor-pointer h-[7vh] flex items-center transition-all duration-100 hover:font-semibold box-border " + (router.pathname === '/chat' ? ' text-[#008EBA] border-b-2 border-[#008EBA]' : '')}>Chats</Link>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-[4rem] text-sm ">
          <div className="flex gap-10">
            <span className="scale-[170%] cursor-pointer hover:text-[#008EBA] hover:font-semibold">
              <MagnifyingGlassIcon />
            </span>
            <span className="scale-[170%] cursor-pointer hover:text-[#008EBA] hover:font-semibold">
              <BellIcon />
            </span>
            <span className="scale-[170%] cursor-pointer hover:text-[#008EBA] hover:font-semibold">
              <ChatBubbleIcon />
            </span>
          </div>

          <div className="flex gap-1">
            {
              user.isSignedIn ?
              <>
                <Link href={"/profile"} className="flex flex-col items-end">
                  <span className="text-md">{ (user.user.fullName ?? user.user.emailAddresses[0]?.emailAddress) }</span>
                  <span className="text-xs">Client</span>
                </Link>
                <Link href={"/profile"} className="cursor-pointer"><Avatar src={user.user.imageUrl} radius="full" fallback="A" size="2" /></Link>
              </> :
              <SignInButton>
                <button className="bg-sky-500 p-4 py-2 rounded hover:bg-sky-600 transition font-semibold text-white">Sign In</button>
              </SignInButton>
            }
          </div>
        </div>
      </div>
    </>
  );
}
