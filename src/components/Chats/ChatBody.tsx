"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import Image from "next/image";

interface Message {
  text: string;
  sender: string;
  image: string;
  timestamp: string;
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

const ChatBody: React.FC<ChatBodyProps> = ({ id, profile1, profile2, channel }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_GOSOCKET}/conversation/${id}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onmessage = (event: any) => {
      const message: Message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => {
      if (ws.current) {
        ws.current.close(); 
      }
    };
  }, [id]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (ws.current && inputMessage.trim()) {
      const newMessage: Message = {
        text: inputMessage,
        sender: profile1.username,
        image: profile1.imageUrl,
        timestamp: new Date().toISOString(),
      };

      ws.current.send(JSON.stringify(newMessage));
      setMessages((prev) => [...prev, newMessage]);
      setInputMessage(""); // Clear the input after sending
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
            this is the beginning of the chat
          </h6>
        </div>
        <div className="flex flex-col space-y-4 mt-4 overflow-auto no-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === profile1.username ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[70%] ${
                  message.sender === profile1.username
                    ? "flex-row-reverse space-x-reverse"
                    : "flex-row"
                }`}
              >
                <Image
                  src={message.image}
                  alt={message.sender}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div
                  className={` p-3 rounded-lg ${
                    message.sender === profile1.username
                      ? "bg-[#54883A] dark:bg-blue-600 text-white"
                      : "bg-white dark:bg-white dark:text-zinc-800"
                  }`}
                >
                  <p className="text-bold">{message.text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center p-2 bg-[#7ac853] dark:bg-[#303237] bottom-0">
        <Image
          src={profile1.imageUrl}
          alt="Profile"
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

export default ChatBody;
