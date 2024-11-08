'use server'

import React from 'react'
import currentUser from './currentUser'
import { redirect } from 'next/navigation';
import db from '@/lib/db';

const findSingleServer = async() => {
    const user = await currentUser();
    if(!user){
        redirect('/sign-n')
    }

    const server = await db.server.findFirst({
        where:{
            profileId:user?.id,
            channel:{
                some:{
                    profileId:user?.id
                }
            }
        }
    })

    if(!server){
        return {found:false}
    }

    return {found:true}
}

export default findSingleServer