import React from "react";
import Image from "next/image";

interface ChatMessageProps {
  message: {
    content: string;
    memberId: string;
    sender?: string;
    image?: string;
    timestamp?: string;
  };
  isSender: boolean;
}

const formatTimestamp = (timestamp: string | undefined): string => {
  if (!timestamp) return "N/A";
  try {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "Invalid Date";
  }
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isSender }) => (
  <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
    <div
      className={`flex items-start space-x-2 max-w-[70%] ${
        isSender ? "flex-row-reverse space-x-reverse" : "flex-row"
      }`}
    >
      <Image
        src={message.image || "/default-avatar.png"}
        alt={message.sender || "User"}
        width={32}
        height={32}
        className="rounded-full"
      />
      <div
        className={`p-3 rounded-lg ${
          isSender
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
);

export default ChatMessage;
