import db from "@/lib/db"
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./ServerHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import ServerSearch from "./ServerSearch";
import { Hash, Mic, ShieldAlert, Star, User, Video } from "lucide-react";
import Text from "./channelArea/Text";
import Audio from "./channelArea/Audio";
import VideoChannel from "./channelArea/VideoChannel";
import Member from "./channelArea/Member";

interface ServerNavBAr {
    serverID: string,
    userId: string | undefined
}

const iconMap = {
    [ChannelType.TEXT]: <Hash className="h-4 w-4"/>,
    [ChannelType.AUDIO]: <Mic className="h-4 w-4"/>,
    [ChannelType.VIDEO]: <Video className="h-4 w-4"/>,
}

const RoleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <Star className="h-4 w-4 fill-amber-500"/>,
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 fill-rose-500"/>,
}

const NaveBar = async ({ serverID, userId }: ServerNavBAr) => {

    const server = await db.server.findUnique({
        where: {
            id: serverID
        },
        include: {
            channel: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            member: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    });

    if(!server){
        redirect('/')
    }

    const textChannels = server?.channel.filter((channel) => {
       return channel.type === ChannelType.TEXT
    })

    const audioChannels = server?.channel.filter((channel) => {
       return channel.type === ChannelType.AUDIO
    })

    const videoChannels = server?.channel.filter((channel) => {
       return channel.type === ChannelType.VIDEO
    })

    const member = server?.member.filter((member) => {
        return member?.id === userId
    })

    let role = null;
     server.member.find((member)=>{
        if(member.profileId === userId){
            role = member.role
        }
    });
    return (
        <>
            <div className="w-[200px] ">
                
               <ServerHeader server={server} role={role} />
                <ScrollArea className="w-full h-full">

                    <div className="flex flex-col w-full h-full">
                            <ServerSearch
                                serverId={serverID}
                                data={[
                                    {
                                        label: "Text Channels",
                                        type: "channel",
                                        data: textChannels.map((channel) => ({
                                            icon: iconMap[channel.type],
                                            name: channel.name, 
                                            id: channel.id
                                        })),
                                    },
                                    {
                                        label: "Audio Channels",
                                        type: "channel",
                                        data: audioChannels?.map((channel) => ({
                                            icon: iconMap[channel.type],
                                            name: channel.name,
                                            id: channel.id
                                        })),
                                    },
                                    {
                                        label: "Video Channels",
                                        type: "channel",
                                        data: videoChannels?.map((channel) => ({
                                            icon: iconMap[channel.type],
                                            name: channel.name, 
                                            id: channel.id
                                        })),
                                    },
                                    {
                                        label: "Members",
                                        type: "member",
                                        data: server?.member.map((member) => ({
                                            icon: RoleIconMap[member.role],
                                            name: member.profile.name, 
                                            id: member.id
                                        })),
                                    }
                                ]}
                            />
                            <div className="w-full h-[85vh] overflow-auto no-scrollbar">
                            <Text  data={textChannels?.map((channel) => ({serverID:serverID,name: channel.name, id: channel.id}))} />
                            <Audio data={audioChannels?.map((channel) => ({serverId:serverID,name: channel.name, id: channel.id}))}/>
                            <VideoChannel data={videoChannels?.map((channel) => ({serverId:serverID,name: channel.name, id: channel.id}))}/>
                            <Member data={
                                server?.member.map((member) => ({
                                    id: member.id,
                                    name: member.profile.name,
                                    role: member.role
                                }))
                            }/>
                            </div>
                    </div>
                </ScrollArea>
            </div>
        </>
    )
}

export default NaveBar