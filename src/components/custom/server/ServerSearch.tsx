"use client"
import { useEffect, useState } from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Command, Search } from "lucide-react"
import { useRouter } from "next/navigation"

interface ServerSearchProps {
    data: {
        label: string,
        type: "channel" | "member",
        data: {
            icon: any,
            name: string,
            id: string,
        }[] | undefined
    }[]
}

export default function ServerSearch({ serverId, data }: { data: ServerSearchProps['data'], serverId: string }) {
    const [open, setOpen] = useState(false)
    const route = useRouter()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen(!open)
            }
        }
        document.addEventListener("keydown", down)

        return () => document.removeEventListener("keydown", down)
    }, [open])

    return (
        <>
            <button 
                className="w-full flex justify-between items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-900/50 h-12 px-3 transition" 
                onClick={() => setOpen(!open)}
            >
                <div className="flex justify-start items-center gap-x-2">
                    <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Search</p>
                </div>
                <div className="flex justify-end items-center bg-zinc-300 dark:bg-zinc-800 p-1 rounded-md">
                    <kbd className="text-sm text-zinc-500 dark:text-zinc-400">
                        <Command className="w-4 h-4" />
                    </kbd>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">+k</span>
                </div>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all channels and members" />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null

                        return (
                            <CommandGroup key={label} heading={label}>
                                {data.map(({ id, icon, name }) => (
                                    <CommandItem 
                                        className="hover:cursor-pointer" 
                                        key={id} 
                                        onSelect={() => {
                                            setOpen(false)
                                            if (type === "channel") {
                                                route.push(`/channels/${serverId}/${id}`)
                                            }
                                            if (type === "member") {
                                                route.push(`/channels/conversation/${id}`)
                                            }
                                        }}
                                    >
                                        {icon}
                                        <span className="ml-2 dark:text-zinc-300">{name}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}
