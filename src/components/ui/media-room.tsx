"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const router = useRouter();
  const { user } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>("Loading...");

  useEffect(() => {
    if (!user) return; // Wait until user is loaded

    const fetchToken = async () => {
      try {
        setLoadingMessage("Fetching your token...");
        const response = await fetch(
          `/api/token?room=${chatId}&username=${encodeURIComponent(user.fullName || "Guest")}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch token: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.token) throw new Error("Token not received");

        setToken(data.token);
      } catch (err: any) {
        console.error("Token Fetch Error:", err);
        setError("Failed to load the media room. Please try again later.");
        setLoadingMessage(""); // Remove loading message if error occurs
      }
    };

    fetchToken();
  }, [user, chatId]);

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
        <p className="text-xs text-muted-foreground">{loadingMessage}</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL!}
      token={token}
      connect={true}
      video={video}
      audio={audio}
      options={{
        publishDefaults: {
          videoSimulcastLayers: [], // Allow all video layers to be sent
        },
        // Make sure all participants can publish video/audio
        adaptiveStream: true,
      }}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
