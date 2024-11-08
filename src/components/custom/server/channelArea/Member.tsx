'use client'

import { MemberRole } from '@prisma/client'
import { Shield, Star, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { use } from 'react'

interface MemberProps {
    id: string
    name: string
    role: MemberRole
}

const Member = ({ data }: { data: MemberProps[] }) => {
    const route = useRouter();
    return (
        <div>
            {
                data?.length == 0 ? null :
                    <div>
                        <h1 className="text-lg bg-indigo-900  text-zinc-200 pt-2 pb-2 flex justify-between items-center px-2">
                            <div>
                                Members
                            </div>
                            <User className="w-6 h-6 text-orange-500" />
                        </h1>
                        {
                            data?.map((member) => (
                                <div className="flex justify-between items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-900/50 h-12 px-3 transition" key={member.id}
                                    onClick={() => {
                                        route.push(`/channels/conversation/${member.id}`)
                                    }}
                                >
                                    <div className="flex justify-start items-center gap-x-2">
                                        <div className="w-6 h-6 flex justify-center items-center bg-zinc-300 dark:bg-zinc-800 p-1 rounded-md">
                                            {
                                                member.role == MemberRole.ADMIN && <Shield className="w-4 h-4 text-red-800" />}
                                            {
                                                member.role == MemberRole.MODERATOR && <Star className="w-4 h-4 text-yellow-500" />}
                                            { member.role == MemberRole.GUEST && <User className="w-4 h-4 text-orange-500" />}
                                        </div>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{member.name}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Member
