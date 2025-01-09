import React from "react";
import Image from "next/image";
import { NaveTooll } from "../custom/NaveTooll";
import { PhoneCall } from "lucide-react";

interface ChatHeaderProps {
  id: string;
  name: string;
  friendName: string;
  channelName: string;
  otherProfileImage: string;
  yourProfileImage: string;
  channelProfileImage: string;
  setCall: React.Dispatch<React.SetStateAction<boolean>>;
  call: boolean;
}

const ChatHeader = ({
  id,
  name,
  friendName,
  channelName,
  otherProfileImage,
  yourProfileImage,
  channelProfileImage,
  setCall,
  call,
}: ChatHeaderProps) => {
  return (
    <div className="relative flex items-center justify-between p-2 bg-zic-200 dark:bg-[#303339] h-12 border-b border-gray-200 dark:border-gray-800">
      {/* Left Section */}
      <div className="flex items-center space-x-2">
        <NaveTooll serverName={friendName}>
          <Image
            src={otherProfileImage}
            alt={id}
            height={20}
            width={40}
            className="rounded-full"
            style={{ position: "absolute" }}
          />
        </NaveTooll>
        <NaveTooll serverName={name}>
          <Image
            src={yourProfileImage}
            alt={yourProfileImage}
            height={20}
            width={40}
            className="rounded-full"
            style={{ position: "absolute", left: "30px" }}
          />
        </NaveTooll>
        <NaveTooll serverName={channelName}>
          <div className="absolute left-16 w-10 h-10 rounded-full hidden sm:block">
            <Image
              src={channelProfileImage}
              alt="Channel Profile Image"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
            />
          </div>
        </NaveTooll>
        <h2 className="absolute left-32 text-xl font-bold text-gray-500 dark:text-gray-400">
          {friendName}
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => setCall(!call)}
        >
          <PhoneCall className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
