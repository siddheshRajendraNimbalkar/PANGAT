'use server'

import db from "@/lib/db";
import {createUser}  from "./createUser"
import { redirect } from "next/navigation";

interface userData{
    id:string,
    userId:string,
      email:string,
      name: string,
      imageUrl:string,
      password:string
}

export const initServer = async() => {
    const profile: userData | any= await createUser();
    if(!profile){
        return false
    }

    const findServer = await db.server.findFirst({
        where:{
            member:{
                some:{
                    profileId: profile.id
                }
            }
        }
    })

    if(findServer){
       return redirect(`/channels/${findServer.id}`)
    }

    return false
}