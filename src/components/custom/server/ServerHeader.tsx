"use client";

import React from 'react'
import { MemberRole, Server } from '@prisma/client'
import { ServerWithProfile } from '../../../../types';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from 'lucide-react';
import InviteModel from './InviteModel';
import ServerSetting from './ServerSetting';
import { ManageMembers } from './ManageMembers';
import CreateChannel from '../CreateChannel';
import { CreateGroup } from './CreateGroup';
import { DeleteChannel } from './DeleteChannel';
import { LeaveChannel } from './LeaveChannel';

interface ServerProp {
    server: ServerWithProfile,
    role?: MemberRole | null
}

const ServerHeader = ({ server, role }: ServerProp) => {
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = role === MemberRole.MODERATOR;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none' asChild>
                <button className="w-[200px] h-12 dark:text-[#F3F2F5] dark:bg-[#34363C] dark:hover:bg-[#2e3036] bg-neutral-200 hover:bg-neutral-300 text-[#3F3F46] text-md font-semibold px-3 flex items-center justify-between ">
                    <div >{server.name}</div>
                    <div><ChevronDown className='dark:text-[#CCCDD1]' /></div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[200px] border-none'>
                {isAdmin || isModerator
                    ?
                    <DropdownMenuItem className='hover:bg-indigo-600 cursor-pointer text-indigo-700 w-full h-8 flex flex-coln justify-between items-center'>
                        <div className="w-full" onClick={(e) => {
                            e.preventDefault()
                        }}> <InviteModel serverName={server?.name} inviteCode={server.invitationCode} /></div>
                        <div className=""> <UserPlus className='h-6 w-4 ml-auto' /> </div>
                    </DropdownMenuItem>
                    : null}
                {
                    isAdmin ?
                        <DropdownMenuItem className=' cursor-pointer w-full h-8 flex flex-coln justify-between items-center'>
                            <div className="w-full" onClick={(e) => {
                                e.preventDefault()
                            }}><ServerSetting serverId={server.id} serverName={server.name} imageUrl={server.imageUrl} /></div>
                            <div className=""> <Settings className='h-6 w-4 ml-auto' /> </div>
                        </DropdownMenuItem>
                        : null
                }
                {
                    isAdmin ?
                        <DropdownMenuItem className=' cursor-pointer w-full h-8 flex flex-coln justify-between items-center'>
                            <div className="w-full" onClick={(e) => {
                                e.preventDefault()
                            }}><ManageMembers serverId={server.id} members={server.member} /></div>
                            <div className=""> <Users className='h-6 w-4 ml-auto' /> </div>
                        </DropdownMenuItem>
                        : null
                }
                {isAdmin || isModerator
                    ?
                    <DropdownMenuItem className='w-full h-8 flex flex-coln justify-between items-center'>
                        <div className="w-full" onClick={(e) => { e.preventDefault() }}><CreateGroup serverId={server.id} /></div>
                        <div className=""> <PlusCircle className='h-6 w-4 ml-auto' /> </div>
                    </DropdownMenuItem>
                    : null}
                {isAdmin || isModerator
                    ?
                    <DropdownMenuSeparator></DropdownMenuSeparator>
                    : null}

                {isAdmin ?
                    <DropdownMenuItem className='text-red-800 w-full h-8 flex flex-coln justify-between items-center'>
                        <div className="w-full" onClick={(e) => { e.preventDefault() }}><DeleteChannel serverId={server.id} /> </div>
                        <div className=""> <Trash className='h-6 w-4 ml-auto' /> </div>
                    </DropdownMenuItem>
                    : null
                }
                {
                    !isAdmin && <DropdownMenuSeparator></DropdownMenuSeparator>
                }

                {!isAdmin ?

                    <DropdownMenuItem className='text-red-800 w-full h-8 flex flex-coln justify-between items-center'>
                        <div className="w-full" onClick={(e)=>{e.preventDefault()}}><LeaveChannel serverId={server.id}/> </div>
                        <div className=""> <LogOut className='h-6 w-4 ml-auto' /> </div>
                    </DropdownMenuItem>
                    : null
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ServerHeader