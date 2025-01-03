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
    <div className="relative flex items-center space-x-2 p-2 px-4 bg-green-200 dark:bg-zinc-800 h-16">
      <NaveTooll serverName={friendName}>
      <Image
        src={otherProfileImage}
        alt={id}
        height={20}
        width={50}
        className="rounded-full"
        style={{position: 'absolute'}}
      />
      </NaveTooll>
      <NaveTooll serverName={name}>
      <Image
        src={yourProfileImage}
        alt={yourProfileImage}
        height={20}
        width={50}
        className="rounded-full"
        style={{position: 'absolute', left: '40px'}}
      />
      </NaveTooll>
      <NaveTooll serverName={channelName}>
      <div className="absolute left-20 w-12 h-12 rounded-full hidden sm:block">
        <Image
          src={channelProfileImage}
          alt="Channel Profile Image"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-full"
        />
      </div>
      </NaveTooll>
      <h2 className="absolute left-36 text-xl font-bold">{friendName}</h2>
    </div>
  );
};

export default ChatHeader;
