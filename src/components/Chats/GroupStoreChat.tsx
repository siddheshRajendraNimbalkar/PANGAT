"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Message {
    ID: string
    Content: string
    FileUrl: string
    MemberId: string
    MemberImage: string
    ChannelId: string
    GroupId: string
    CreatedAt: string
}

interface Profile {
    id: string
    username: string
    imageUrl: string
}

const formatTimestamp = (timestamp: string): string => {
    if (!timestamp) return "N/A";
    try {
        return new Date(timestamp).toLocaleTimeString([], { 
            hour: "2-digit", 
            minute: "2-digit" 
        });
    } catch {
        return "Invalid Date";
    }
};

const GroupStoreChat = ({ id , profile}: { id: string, profile: Profile }) => {
    const [messages, setMessages] = useState<Message[]>([])
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                console.log(`${process.env.NEXT_PUBLIC_GOSERVER}/group/${id}`)
                const response = await fetch(`${process.env.NEXT_PUBLIC_GOSERVER}/group/${id}`)
                const data = await response.json()
                if (data.success){
                    setMessages(data.messages)
                }
            } catch (error) {
                console.error("Error fetching messages:", error)
            }
        }
        fetchMessages()

    },[id])
    
  return (
    <div>
    <div>
        {messages.map((message, index) => (
            <div key={index}>

                <div className={`flex ${message.MemberId == profile.id ? "justify-end" : "justify-start"}`}>
                    <div
                        className={`flex items-start space-x-2 max-w-[70%] ${message.MemberId == profile.id ? "flex-row-reverse space-x-reverse" : "flex-row"
                            }`}
                    >
                        {message.MemberId == profile.id ? <Image
                            src={profile.imageUrl}
                            alt={profile.username}
                            width={32}
                            height={32}
                            className="rounded-full"
                        /> : <Image
                            src={message.MemberImage}
                            alt={message.MemberId}
                            width={32}
                            height={32}
                            className="rounded-full"
                        />}
                        <div
                            className={`p-3 rounded-lg ${message.MemberId == profile.id
                                ? "bg-green-600 dark:bg-blue-600 text-white"
                                : "bg-white dark:bg-white dark:text-zinc-800"
                                }`}
                        >
                            <p className="text-bold">{message.Content}</p>
                            {message.ChannelId && (
                                <p className="text-xs text-gray-400 mt-1">{formatTimestamp(message.ChannelId)}</p>
                            )}
                        </div>
                    </div>
                </div>
                <br />
            </div>
        ))}
    </div>
</div>
  )
}

export default GroupStoreChat