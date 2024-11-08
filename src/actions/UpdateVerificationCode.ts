'use server'

import db from '@/lib/db'
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import currentUser from './currentUser';

const UpdateVerificationCode = async(params:any) => {
    try {
        const profile = await currentUser();
        if(!profile){
            redirect('/')
        }
        const server = await db.server.update({
            where:{
                id:params
            },
            data:{
                invitationCode:uuidv4()
            }
        })
    
        if(!server){
            return false
        }
    
        return server
    } catch (error) {
        console.log("[ERROR Update Verification Code]:",error)
        return error
    }
}

export default UpdateVerificationCode