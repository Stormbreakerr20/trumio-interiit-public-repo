import Navbar from "~/components/Navbar";
import * as React from 'react';
import { Montserrat } from 'next/font/google'
import { useAuth } from "@clerk/nextjs";
import { useUserStore } from "~/store/UserStore";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

interface LayoutProps {
  children?: React.ReactNode
}

const mont = Montserrat({ subsets: ['latin'] })

export default function Layout({ children }: LayoutProps) {

  const { user, setUser } = useUserStore()
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const { data, isLoading } = api.user.getUser.useQuery({}, { enabled: !user && isSignedIn })
  
  React.useEffect(() => {
    console.log(data?.role)
    if(data?.role === "null") router.push('/auth').catch((err) => console.log(err))
    if(data && !user) {
      setUser(data)
    }
  },[data,user])

  return (
    <>
      {router.pathname === '/auth'?"":<Navbar />}
      <div className={`min-h-[100vh] ${router.pathname === '/auth'?"":"pt-[7vh]"} bg-gray-100 overflow-scroll" + ${mont.className}`}>
        {children}
      </div> 
      {/* {
        isLoading ?
        <div className="h-[100vh] w-[100vw] flex justify-center items-center z-1 bg-slate-400 bg-opacity-60 absolute left-0 top-0">
          <Loading className="stroke-sky-500 scale-[200%]" />
        </div> : null
      } */}
    </>
  )
}