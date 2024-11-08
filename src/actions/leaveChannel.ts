'use server'

import db from "@/lib/db";
import currentUser from "./currentUser"

const leaveChannel = async({serverId}:{serverId:string}) => {
    const profile = await currentUser();
    if(!profile){
        return {success:false,message:"No authenticated user"}
    }

    if(!serverId){
        return {success:false,message:"serverId of group not found"}
    }

    const Leave = await db.server.update({
        where:{
            id:serverId,
            profileId:{
                not:profile.id
            },
            member:{
                some:{
                    profileId:profile.id
                }
            }
        },
        data:{
            member:{
                deleteMany:{
                    profileId:profile.id
                }
            }
        }
    })

    if(!Leave){
        return {success:false,message:"failed to Leave server"}
    }
    return {success:true,message:"Leave Succesfully"}
}

export default leaveChannel