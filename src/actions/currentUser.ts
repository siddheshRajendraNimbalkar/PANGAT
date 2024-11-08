'use server'

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const currentUser = async() => {
    const {userId} = auth();
    if(!userId){
        return false
    }
    const user = await db.profile.findUnique({
        where:{
            userId:userId,
        }
    })
    if(!user){
        return false
    }
    console.log(user)
    return user
}
export default currentUser