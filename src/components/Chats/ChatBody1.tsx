"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import Image from "next/image";

interface Message {
  content: string;
  fileUrl: string | null;
  memberId: string;
  channelId: string;
  sender?: string;
  image?: string;
  timestamp?: string;
  imageUrl?: string;
  roomId?: string;
}

interface StoredMessage {
  id: string;
  createdAt: string;
  content: string;
  memberId: string;
  channelId: string;
  sender: string;
  image: string;
  timestamp: string;
  imageUrl: string;
  roomId: string;
}

interface ChatBodyProps {
  id: string;
  profile1: {
    username: string;
    imageUrl: string;
    id: string;
  };
  profile2: {
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

const ChatBody1: React.FC<ChatBodyProps> = ({ id, profile1, profile2, channel }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const [storedMessages, setStoredMessages] = useState<StoredMessage[]>([]);

  useEffect(() => {
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_GOSOCKET}/conversation/${id}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => console.log(`Connected to WebSocket room: ${id}`);
    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const message: Message = JSON.parse(event.data);

        // Avoid adding duplicate messages (based on timestamp or unique content)
        setMessages((prev) => {
          const isDuplicate = prev.some((m) => m.timestamp === message.timestamp && m.content === message.content);
          return isDuplicate ? prev : [...prev, message];
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    ws.current.onerror = (error) => console.error("WebSocket error:", error);
    ws.current.onclose = () => console.log(`Disconnected from WebSocket room: ${id}`);

    return () => {
      ws.current?.close();
    };
  }, [id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchingMessage = await fetch(`${process.env.NEXT_PUBLIC_GOSERVER}/message/${id}`);
        const data = await fetchingMessage.json();
        setStoredMessages(data.messages);
        console.log(data.messages); // Log here to view fetched messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
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
          roomId: id,
        };
        console.log("newMessage", newMessage);
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
      <div className="messages flex flex-col p-2 h-[calc(100vh-100px)] bg-[#88BB56] dark:bg-[#383A40]">
        <div>
          <h1 className="text-4xl font-bold text-[#9B6636] dark:text-[#DBDEE1] text-center">
            You are welcome to the chat
          </h1>
          <h1 className="text-4xl font-bold text-center text-[#9B6636] dark:text-[#DBDEE1]">
            with {profile2.username}
          </h1>
          <h6 className="text-sm text-center text-[#1A1F1C] dark:text-[#DBDEE1]">
            This is the beginning of the chat
          </h6>
        </div>




        <div className="flex flex-col space-y-4 mt-4 overflow-auto no-scrollbar">
          {storedMessages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.memberId === profile1.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[70%] ${
                  message.memberId === profile1.id
                    ? "flex-row-reverse space-x-reverse"
                    : "flex-row"
                }`}
              >
                <Image
                  src={message.image || profile1.imageUrl}
                  alt={message.sender || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div
                  className={`p-3 rounded-lg ${
                    message.memberId === profile1.id
                      ? "bg-[#54883A] dark:bg-blue-600 text-white"
                      : "bg-white dark:bg-white dark:text-zinc-800"
                  }`}
                >
                  <p className="text-bold">{message.content}</p>
                  {message.createdAt && (
                    <p className="text-xs text-gray-400 mt-1">{formatTimestamp(message.createdAt)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>




        <div className="flex flex-col space-y-4 mt-4 overflow-auto no-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.memberId === profile1.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[70%] ${
                  message.memberId === profile1.id
                    ? "flex-row-reverse space-x-reverse"
                    : "flex-row"
                }`}
              >
                <Image
                  src={message.image || profile1.imageUrl}
                  alt={message.sender || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div
                  className={`p-3 rounded-lg ${
                    message.memberId === profile1.id
                      ? "bg-[#54883A] dark:bg-blue-600 text-white"
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
      <div className="flex justify-center items-center p-2 bg-[#7ac853] dark:bg-[#303237] bottom-0">
        <Image
          src={profile1.imageUrl}
          alt={`${profile1.username}'s Profile`}
          width={32}
          height={32}
          className="rounded mr-2"
        />
        <Input
          type="text"
          className="dark:bg-[#383A40] dark:text-white border-0 bg-[#54883A]"
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
          className="dark:bg-blue-500 dark:text-white border-0 bg-[#54883A] ml-2"
          onClick={sendMessage}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatBody1;
