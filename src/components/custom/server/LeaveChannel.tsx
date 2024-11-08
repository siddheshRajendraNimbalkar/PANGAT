"use client"

import leaveChannel from "@/actions/leaveChannel"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import Image from 'next/image'

import { useRouter } from 'next/navigation'

export function LeaveChannel({ serverId }: { serverId: string }) { 
    const router = useRouter()
    return (
        <Dialog>
            <DialogTrigger className="w-full flex justify-center text-rose-800"><button>Leave Channel</button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center text-2xl text-rose-800">Leave Channel</DialogTitle>
                    <DialogDescription className="flex flex-col items-center justify-center">
                        <div className="mb-1 text-rose-600 font-bold">Do You Realy want to leave Us...</div>
                       <div>
                       <Image
                            src="/anime-one-piece-monkey-d-luffy-portgas-d-ace-wallpaper-preview.jpg"
                            alt="Picture of the author"
                            width={350}
                            height={350}
                            className="rounded-md"
                        />
                       </div>
                    </DialogDescription>
                </DialogHeader>
                <Button className="bg-red-800" onClick={async () => {
                   const res = await leaveChannel({serverId});
                   if (res.success) {
                    window.location.reload();
                    router.push('/channels')
                   }
                }}>Leave</Button>
            </DialogContent>
        </Dialog>
    )
}
