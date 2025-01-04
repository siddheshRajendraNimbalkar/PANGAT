import React from "react";
import Image from "next/image";
import { NaveTooll } from "../custom/NaveTooll";

interface ChatHeaderProps {
  id: string;
  name: string;
  friendName: string;
  channelName: string;
  otherProfileImage: string;
  yourProfileImage: string;
  channelProfileImage: string;
}

const ChatHeader = ({
  id,
  name,
  friendName,
  channelName,
  otherProfileImage,
  yourProfileImage,
  channelProfileImage,
}: ChatHeaderProps) => {
  return (
    <div className="relative flex items-center space-x-2 p-2 px-2 bg-green-200 dark:bg-[#303339] h-12 border-b border-gray-200 dark:border-gray-800">
      <NaveTooll serverName={friendName}>
      <Image
        src={otherProfileImage}
        alt={id}
        height={20}
        width={40}
        className="rounded-full"
        style={{position: 'absolute'}}
      />
      </NaveTooll>
      <NaveTooll serverName={name}>
      <Image
        src={yourProfileImage}
        alt={yourProfileImage}
        height={20}
        width={40}
        className="rounded-full"
        style={{position: 'absolute', left: '30px'}}
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
      <h2 className="absolute left-32 text-xl font-bold text-gray-500 dark:text-gray-400">{friendName}</h2>
    </div>
  );
};

export default ChatHeader;
