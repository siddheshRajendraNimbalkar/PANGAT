"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import Image from "next/image";
import GroupStoreChat from "./GroupStoreChat";

interface Message {
  content: string;
  fileUrl: string | null;
  memberId: string;
  memberImage: string;
  channelId: string;
  sender?: string;
  image?: string;
  timestamp?: string;
  imageUrl?: string;
  groupId?: string;
}

interface StoredMessage {
  id: string;
  createdAt: string;
  content: string;
  memberId: string;
  channelId: string;
  timestamp: string;
  imageUrl: string;
  groupId: string;
}

interface ChatBodyProps {
  id: string;
  profile1: {
    username: string;
    imageUrl: string;
    id: string;
  };
  channel: {
    name: string;
    imageUrl: string;
    id: string;
  };
}

const GroupBody: React.FC<ChatBodyProps> = ({ id, profile1, channel }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_GOSOCKET}/conversation/${id}`;
    ws.current = new WebSocket(wsUrl);
    console.log(id)
    ws.current.onopen = () => console.log(`Connected to WebSocket group: ${id}`);
    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const message: Message = JSON.parse(event.data);
        console.log(message)
        setMessages((prev) => {
          const isDuplicate = prev.some((m) => m.timestamp === message.timestamp && m.content === message.content);
          return isDuplicate ? prev : [...prev, message];
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    ws.current.onerror = (error) => console.error("WebSocket error:", error);
    ws.current.onclose = () => console.log(`Disconnected from WebSocket group: ${id}`);

    return () => {
      ws.current?.close();
    };
  }, [id]);

  const sendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!inputMessage.trim()) return;

      if (ws.current) {
        const newMessage: Message = {
          content: inputMessage.trim(),
          fileUrl: null,
          memberId: profile1.id,
          channelId: channel.id,
          sender: profile1.username,
          timestamp: new Date().toISOString(),
          image: profile1.imageUrl,
          groupId: id,
          memberImage: profile1.imageUrl,
        };
        ws.current.send(JSON.stringify(newMessage));
        setInputMessage("");
      }
    },
    [inputMessage]
  );

  const formatTimestamp = (timestamp: string | undefined): string => {
    if (!timestamp) return "N/A";
    try {
      return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div>
      <div className="messages flex flex-col p-2 h-[calc(100vh-100px)] bg-zinc-300 dark:bg-[#383A40] overflow-auto no-scrollbar">
        <GroupStoreChat id={id} profile={profile1} />
        <div className="flex flex-col space-y-4 mt-4 overflow-auto no-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.memberId === profile1.id ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[70%] ${message.memberId === profile1.id
                    ? "flex-row-reverse space-x-reverse"
                    : "flex-row"
                  }`}
              >
                <Image
                  src={message.memberImage}
                  alt={message.memberId}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div
                  className={`p-3 rounded-lg ${message.memberId === profile1.id
                      ? "bg-zinc-300 dark:bg-blue-600 text-white"
                      : "bg-white dark:bg-white dark:text-zinc-800"
                    }`}
                >
                  <p className="text-bold">{message.content}</p>
                  {message.timestamp && (
                    <p className="text-xs text-gray-400 mt-1">{formatTimestamp(message.timestamp)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="flex justify-center items-center p-2 bg-zinc-200 dark:bg-[#303237] bottom-0">
        <Image
          src={profile1.imageUrl}
          alt={`${profile1.username}'s Profile`}
          width={32}
          height={32}
          className="rounded mr-2"
        />
        <Input
          type="text"
          className="dark:bg-[#383A40] dark:text-white border-0 bg-zinc-300"
          placeholder="Type your message here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(e);
            }
          }}
        />
        <Button
          type="submit"
          className="bg-blue-500 dark:text-white border-0 ml-2"
          onClick={sendMessage}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default GroupBody;
