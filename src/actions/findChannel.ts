"use server"

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const findChannel = async({id}:{id:any}) =>{
    const user = await currentUser();

    if(!user){
        return {found:false}
    }
    const channel = await db.channel.findFirst({
        where:{
            serverId:id,
            name:"general",
        }
    })

    if(!channel){
        return {found:false}
    }

    return {found:true,data:channel}

}

export default findChannel