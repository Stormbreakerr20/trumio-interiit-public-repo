import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {

  const {mutate} = api.user.updateUserRole.useMutation()
  const handleClick = (role:string) => {
    try {
      const result = mutate({
        text:role
      })
      console.log(result)
      
    } catch (error) {
      console.error('Error creating bid:', error);
    }
  }
  return (
    <>
      <div className="flex h-[100vh] w-[100%] justify-center bg-[#FFFFFF]">
        <div className="flex justify-between gap-5 items-center">
          <div className="flex flex-col gap-5 bg-[#F1FAFF] h-[70vh] rounded-3xl shadow-xl  p-5 w-[400px]">
            <div className="flex items-center mt-5">
              <span>
                <Image
                  src="/images/Trumio.png"
                  alt=""
                  width={170}
                  height={50}
                />
              </span>
              <span className="pt-1 text-xs">v0.0.8</span>
            </div>
            <div className="text-2xl pl-1">Welcome!</div>
            <div className="flex flex-col gap-4 mt-5">
              <Link onClick={() => handleClick("talent")} href={"/talentonboarding"} className="flex flex-col justify-center cursor-pointer items-center bg-white p-5 shadow-md rounded-md">
                <span className="text-[#0065C1] text-xl">Talent</span>
                <span className="text-sm font-light">Find projects and teams</span>
              </Link>
              <Link onClick={() => handleClick("client")} href={"/clientonboarding"} className="flex flex-col justify-center cursor-pointer items-center bg-white p-5 shadow-md rounded-md">
                <span className="text-[#0065C1] text-xl">Client</span>
                <span className="text-sm font-light">Hire great teams and talent</span>
              </Link>
            </div>
          </div>
          <div>
            <Image width={700} height={700} src="/images/Mainpage.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
