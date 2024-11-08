'use server'

import db from "@/lib/db";
import currentUser from "./currentUser"

const deleteServer = async({serverId}:{serverId:string}) => {
    const profile = await currentUser();
    if(!profile){
        return {success:false,message:"No authenticated user"}
    }

    if(!serverId){
        return {success:false,message:"serverId of group not found"}
    }

    const deleteServer = await db.server.delete({
        where:{
            id:serverId,
            profileId:profile.id
        }
    })

    if(!deleteServer){
        return {success:false,message:"failed to delete server"}
    }
    return {success:true,message:"Deleted Succesfully"}
}

export default deleteServer