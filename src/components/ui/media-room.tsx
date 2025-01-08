"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { createUser } from "@/actions/createUser";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

interface User {
  id: string;
  name: string;
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [user,setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const user:any = await createUser();
      setUser(user);
    }
    getUser();

    const fetchToken = async () => {
      try {
        if(user == null){
          return;
        }
        const response = await fetch(`/api/token?room=${chatId}&username=${user?.name}`);
        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }
        const data = await response.json();
        setToken(data.token);
      } catch (err) {
        console.error(err);
        setError("Failed to load the media room. Please try again later.");
      }
    };

    fetchToken();
  }, [user?.name, chatId, user?.id]);

  if (error) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center">
        <p className="text-sm text-red-500">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => router.push("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center">
        <Loader2 className="h-7 w-7 text-muted-foreground animate-spin my-4" />
        <p className="text-xs text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKEEPER_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
