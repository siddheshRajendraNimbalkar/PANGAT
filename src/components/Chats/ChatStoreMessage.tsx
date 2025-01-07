"use client"

import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import Image from "next/image";

interface Message {
    ChannelId: string;
    Content: string;
    CreatedAt: string;
    FileUrl: string;
    MemberId: string;
    RoomId: string;
}

interface Profile {
    id: string;
    username: string;
    imageUrl: string;
}

const formatTimestamp = (timestamp: string): string => {
    if (!timestamp) return "N/A";
    try {
        return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
        return "Invalid Date";
    }
};

export default function ChatStoreMessage({ id, profile1, profile2 }: { id: string, profile1: Profile, profile2: Profile }) {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const fetchingMessage = await fetch(`${process.env.NEXT_PUBLIC_GOSERVER}/message/${id}`);
                const data = await fetchingMessage.json();
                console.log("Fetched messages:", data); // Log the data here
                setMessages(data.messages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [id]);

    return <div>
        <div>
            {messages.map((message, index) => (
                <div key={index}>

                    <div className={`flex ${message.MemberId == profile1.id ? "justify-end" : "justify-start"}`}>
                        <div
                            className={`flex items-start space-x-2 max-w-[70%] ${message.MemberId == profile1.id ? "flex-row-reverse space-x-reverse" : "flex-row"
                                }`}
                        >
                            {message.MemberId == profile1.id ? <Image
                                src={profile1.imageUrl}
                                alt={profile1.username}
                                width={32}
                                height={32}
                                className="rounded-full"
                            /> : <Image
                                src={profile2.imageUrl}
                                alt={profile2.username}
                                width={32}
                                height={32}
                                className="rounded-full"
                            />}
                            <div
                                className={`p-3 rounded-lg ${message.MemberId == profile1.id
                                    ? "bg-[#54883A] dark:bg-blue-600 text-white"
                                    : "bg-white dark:bg-white dark:text-zinc-800"
                                    }`}
                            >
                                <p className="text-bold">{message.Content}</p>
                                {message.CreatedAt && (
                                    <p className="text-xs text-gray-400 mt-1">{formatTimestamp(message.CreatedAt)}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            ))}
        </div>
    </div>
}