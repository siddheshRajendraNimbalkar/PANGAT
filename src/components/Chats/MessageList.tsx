import React from "react";
import ChatMessage from "./ChatMessage";

interface MessageListProps {
  messages: {
    content: string;
    memberId: string;
    sender?: string;
    image?: string;
    timestamp?: string;
  }[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => (
  <div className="flex flex-col space-y-4 mt-4 overflow-auto no-scrollbar">
    {messages.map((message, index) => (
      <ChatMessage
        key={index}
        message={message}
        isSender={message.memberId === currentUserId}
      />
    ))}
  </div>
);

export default MessageList;
