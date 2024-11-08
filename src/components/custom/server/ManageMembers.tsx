'use client'
import changeMemberRole from "@/actions/changeMemberRole"
import RemoveMemberFromServer from "@/actions/RemoveMemberFromServer"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MemberRole } from "@prisma/client"
import { ShieldCheck, ShieldPlus, Trash } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function ManageMembers({ serverId, members }: any) {
  const [tog1, settog1] = useState(true)
  const [tog2, settog2] = useState(true)
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full flex justify-start">Manage Members</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Members</DialogTitle>
          </DialogHeader>
          <div className="font-medium">
            Members:{members.length}
          </div>
          <div className="max-h-56 overflow-auto">
            {members.map((member: any, index: number) => (
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-800">
                <Image
                  src={member.profile.imageUrl}
                  alt="Picture of the user"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                {
                  member.profile.name.length >= 9
                    ?
                    <div className="font-bold flex ">{member.profile.name.substring(0, 9)}
                      {member.role == MemberRole.ADMIN ? <ShieldPlus className="mr-2 text-rose-900" /> : null}
                      {member.role == MemberRole.MODERATOR ? <ShieldCheck className="mr-2 text-green-900" /> : null}
                    </div>
                    :
                    <div className="font-bold">{member.profile.name}
                      {member.role == MemberRole.ADMIN ? <ShieldPlus className="mr-2 text-rose-900" /> : null}
                      {member.role == MemberRole.MODERATOR ? <ShieldCheck className="mr-2 text-green-900" /> : null}
                    </div>
                }

                <div className="flex p-1">
                  {member.role == MemberRole.ADMIN ? <Button>ADMIN</Button> :
                    <DropdownMenu>
                      <DropdownMenuTrigger><Button className={`${tog2 ? null : "bg-green-900"}`}>{member.role}</Button></DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <button onClick={async () => {
                            const id = member.id;
                            const role = MemberRole.MODERATOR;
                            const response = await changeMemberRole({ serverId, id, role });
                            console.log(response)
                            if (response.success == true) {
                              settog2(!true)
                            }
                          }}>{MemberRole.MODERATOR}</button></DropdownMenuItem>
                        <DropdownMenuItem><button onClick={async () => {
                          const id = member.id;
                          const role = MemberRole.GUEST;
                          const response = await changeMemberRole({ serverId, id, role });
                          console.log(response)
                          if (response.success == true) {
                            settog2(!true)
                          }
                        }}>{MemberRole.GUEST}</button></DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  }
                  {member.role !== MemberRole.ADMIN
                    ?
                    <button className={`${tog1 ? "bg-rose-800" : "bg-green-900"} hover:bg-red-900 p-1 rounded-lg font-bold`} onClick={async () => {
                      const id = member.id;
                      const response = await RemoveMemberFromServer({ serverId, id })
                      if (response.success == true) {
                        settog1(false)
                      }
                    }}> 
                      <Trash />
                    </button>
                    :
                    null}
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
