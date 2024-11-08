import currentUser from "@/actions/currentUser"
import db from "@/lib/db";
import { redirect } from "next/navigation";

const page = async({params}:{params:{inviteCode:string}}) => {
    const profile = await currentUser();
    if(!profile){
        redirect('/sign-in')
    }

    const findServer = await db.server.findFirst({
        where:{
            invitationCode: params.inviteCode,
            member:{
                some:{
                    profileId: profile.id
                }
            }
        }
    }) 

    if(findServer){
        redirect(`/channels/${findServer.id}`)
    }

    const server = await db.server.findFirst({
        where: {
            invitationCode: params.inviteCode,
        }
    });

    if (!server) {
        <div className="h-full w-full flex justify-center items-center">
            <div>
                Server Not Found
            </div>
        </div>
    }

    const newMember = await db.server.update({
        where:{
            id: server?.id,
        },
        data:{
            member:{
                create:[
                    {
                        profileId: profile.id
                    }
                ]
            }
        }
    });

    if(newMember){
        redirect(`/channels/${newMember.id}`)
    }

    return null
}

export default page;