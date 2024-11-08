'use server'

import currentUser from "./currentUser"
import db from "@/lib/db";
import { MemberRole } from "@prisma/client";

interface createGroupInfo{
    serverId:string,
    name:any,
    type:any
}

const createGroup = async({serverId,name,type}:createGroupInfo) => {
    try {
        const profile = await currentUser();
        if(!profile){
            return {success:false,message:"No authenticated user"}
        }
        if(!name || !type){
            return {success:false,message:"name or type of group not found"}
        }

        if(!serverId){
            return {success:false,message:"serverId of group not found"}
        }

        if(name == "general"){
            return {success:false,message:"group name cant be generalcons"}
        }

        const group = await db.server.update({
            where:{
                id:serverId,
                member:{
                    some:{
                        profileId:profile.id,
                        role:{
                            in:[MemberRole.ADMIN,MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data:{
                channel:{
                    create:{
                        profileId:profile.id,
                        name:name,
                        type:type
                    }
                }
            }
        })

        return {success:true,message:"Group Is Created",group:group}

    } catch (error) {
        console.log("[Error In createGroup]: ",error);
        return{success:false,error:error}
    }
}
export default createGroup