"use server"

import React from 'react'
import currentUser from './currentUser'
import db from '@/lib/db';

const deleteServerChannel = async(channelId:any) => {
    const user = currentUser;
    if(!user){
        return {success:false}
    }
    try {
        const deleteChannel = await db.channel.delete({
            where:{
                id:channelId
            }
        })
        if(!deleteChannel){
            return {success:false,message:"failed to delete channel"}
        }
        return {success:true}
    } catch (error) {
        return {success:false,error:error}
    }
}

export default deleteServerChannel
