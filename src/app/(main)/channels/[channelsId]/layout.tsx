import currentUser from "@/actions/currentUser"
import findServerByParams from "@/actions/findServerByParams"
import NaveBar from "@/components/custom/server/NaveBar"
import db from "@/lib/db"
import { RedirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import React from "react"

const layout = async({children,params}:{children:React.ReactNode,params:{channelsId:string}}) => {

   const server = await findServerByParams(params)
   console.log(server.found)

    if(!server.found){
        return redirect('/')
    }

  return (
   <div className="h-[100vh] flex">
    <div className="hidden md:flex h-[100vh] bg-[#f0f0f3] dark:bg-[#2B2C30] w-60">
      <NaveBar serverID={params.channelsId} userId={server?.userId}/>
      {/* {server.userId} */}
    </div>
    <main className="h-[100vh] w-[100%] md-pl-60 bg-[#000101]">
    {children}
    </main>
   </div>
  )
}

export default layout