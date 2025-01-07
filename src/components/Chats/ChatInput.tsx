import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import Image from "next/image";

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (value: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  userImage: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  onSendMessage,
  userImage,
}) => (
  <div className="flex justify-center items-center p-2 bg-[#7ac853] dark:bg-[#303237] bottom-0">
    <Image
      src={userImage}
      alt="User Profile"
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
          onSendMessage(e);
        }
      }}
    />
    <Button
      type="submit"
      className="dark:bg-blue-500 dark:text-white border-0 bg-[#54883A] ml-2"
      onClick={onSendMessage}
    >
      <Send className="w-4 h-4" />
    </Button>
  </div>
);

export default ChatInput;
