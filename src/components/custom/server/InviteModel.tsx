'use client'

import UpdateVerificationCode from "@/actions/UpdateVerificationCode"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InviteUrl } from "@/hooks/InviteUrl"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export function InviteModel({ serverName, inviteCode }: { serverName: string, inviteCode: string }) {
    const param = useParams()
    const getInviteUrl = InviteUrl();
    const [copy, setCopy] = useState(false)

    const [loader, setLoader] = useState(false)
    const [isMo, setisMo] = useState(false)
    const [currentInviteCode, setCurrentInviteCode] = useState(inviteCode)      

    useEffect(() => {
        setisMo(true)
    }, [inviteCode])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className=" w-full flex justify-start">Invite People</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className=" flex justify-center items-center">Invite People</DialogTitle>
                    <DialogDescription className="flex justify-center items-center font-bold ">
                        Invite People to {serverName} Server
                    </DialogDescription>
                </DialogHeader>
                <div className=" py-4">
                    <Label className="text-right">
                        InviteUrl
                    </Label>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input id="username" value={`${getInviteUrl}${currentInviteCode}`} className="col-span-3" readOnly />
                        <Button className="bg-indigo-600 hover:bg-indigo-600/90" onClick={() => { onCopy(getInviteUrl, currentInviteCode, setCopy) }}>
                            {
                                copy ? "Copied" : "copy"
                            }
                        </Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="link" onClick={async () => {
                        setLoader(true)
                        const zehahaha : any = await UpdateVerificationCode(param.channelsId);
                        if (zehahaha !== false) {
                            setCurrentInviteCode(zehahaha?.invitationCode   )
                        }
                        setLoader(false)
                    }}>Generate a new link</Button>
                    {
                        loader ?<div className=" flex justify-center items-center">
                        "Loading"
                    </div>: null
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const onCopy = (getInviteUrl: string, inviteCode: string, setCopy: any) => {
    navigator.clipboard.writeText(`${getInviteUrl}${inviteCode}`)
    setCopy(true)
    setTimeout(() => {
        setCopy(false)
    }, 1000)
}

export default InviteModel
