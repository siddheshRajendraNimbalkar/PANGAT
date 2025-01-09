"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ChatStoreMessage from "./ChatStoreMessage";
import { group } from "console";

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
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(`${process.env.NEXT_PUBLIC_WS_GOSOCKET}/conversation/${id}`);

    ws.current.onopen = () => console.log(`Connected to WebSocket room: ${id}`);
    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    ws.current.onclose = () => console.log(`Disconnected from WebSocket room: ${id}`);

    return () => {
      ws.current?.close();
    };
  }, [id]);

  const sendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputMessage.trim() || !ws.current) return;

      const newMessage = {
        content: inputMessage.trim(),
        memberId: profile1.id,
        channelId: channel.id,
        sender: profile1.username,
        timestamp: new Date().toISOString(),
        image: profile1.imageUrl,
        roomId: id,
      };

      ws.current.send(JSON.stringify(newMessage));
      setInputMessage("");
    },
    [inputMessage, profile1, channel]
  );

  return (
    <div>
      <div className="messages flex flex-col p-2 h-[calc(100vh-100px)] bg-zinc-200 dark:bg-[#383A40]">
        <ChatStoreMessage id={id} profile1={profile1} profile2={profile2} />
        <MessageList messages={messages} currentUserId={profile1.id} />
      </div>
      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={sendMessage}
        userImage={profile1.imageUrl}
      />
    </div>
  );
};

export default ChatBody;
