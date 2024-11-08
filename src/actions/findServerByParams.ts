'use server'

import currentUser from './currentUser'
import db from '@/lib/db'

const findServerByParams = async (params: { channelsId: string }) => {
    try {
        const profile = await currentUser()

        if (!profile) {
            return { redirect: '/sign-in' }
        }
        console.log(profile.id)

        const server = await db.server.findFirst({
            where: {
                id: params.channelsId,
                member:{
                    some:{
                        profileId:profile?.id
                    }
                }
            }
        })


        if (server) {
            return { found: true,userId:profile.id }
        }
        
        return { found: false }
    } catch (error) {
        console.error('Error finding server by params:', error)
        return { error: 'An error occurred while finding the server.' }
    }
}

export default findServerByParams
