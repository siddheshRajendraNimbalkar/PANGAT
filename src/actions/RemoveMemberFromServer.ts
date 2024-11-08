'use server'

import db from "@/lib/db";
import currentUser from "./currentUser"
import { MemberRole } from "@prisma/client";

const RemoveMemberFromServer = async ({ serverId, id }: { serverId: string, id: string }) => {
    try{
        if (!serverId || !id) {
            console.log("Missing serverId or id:", { serverId, id });
            return { success: false, message: "Server ID or member ID is missing" };
        }
        const user = await currentUser()
        if (!user) {
            return { success: false, message: "No authenticated user" };
        }

        const isUser = db.server.findFirst({
            where:{
                id:serverId,
                member:{
                    some:{
                        id:id
                    }
                }
            },
            
        })

        if(!isUser){
            return { success: false, message: "User Not Found" };
        }
    
        const deleteUser = await db.server.update({
            where: {
                id: serverId,
            },
            data: {
                member: {
                    delete: {
                        id: id
                    }
                }
            }
        })
    
        if (!deleteUser) {
            return { success: false, message: "Error while Deleting Member" };
        }
    
        return { success: true, message: "Done" };
    }catch(err){
        console.log("[ERROR DELETING MEMBER]:", err);
        return { err: err };
    }
}

export default RemoveMemberFromServer