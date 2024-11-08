"use client"

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
import deleteServer from "@/actions/deleteServer"
import { useRouter } from 'next/navigation'
import NaveCreateServer from "../NaveCreateServer"

export function DeleteChannel({ serverId }: { serverId: string }) { 
    const router = useRouter()
    return (
        <Dialog>
            <DialogTrigger className="w-full flex justify-center text-rose-800"><button>Delete Channel</button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4 flex justify-center text-rose-800">Do You Realy want to leave Us...</DialogTitle>
                    <DialogDescription className="flex justify-center">
                        <Image
                            src="/artworks-000133707516-gob6jq-t500x500.jpg"
                            alt="Picture of the author"
                            width={250}
                            height={250}
                            className="rounded-md"
                        />
                    </DialogDescription>
                </DialogHeader>
                <Button className="bg-red-800" onClick={async () => {
                    const res = await deleteServer({serverId});
                    if(res.success){
                        window.location.reload();
                        router.push('/channels')
                    }
                }}>Delete</Button>
            </DialogContent>
        </Dialog>
    )
}
