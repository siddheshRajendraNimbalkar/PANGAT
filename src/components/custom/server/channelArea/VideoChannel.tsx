'use client'

import React from 'react'
import { Video } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface VideoProps {
  serverId: string
  id: string
  name: string
}

const VideoChannel = ({ data }: { data: VideoProps[] }) => {
  const route = useRouter()
  return (
    <div>
      <h1 className="text-lg text-zinc-500 dark:text-zinc-400 bg-zinc-300 dark:bg-zinc-900/50 pt-2 pb-2 flex justify-between items-center px-2">
        <div>
          Video Channels
        </div>
        <Video className="w-6 h-6 text-green-800 " />
      </h1>
      {
        data?.length == 0 ? null :
          data?.map((video) => (
            <div className="flex justify-between items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-900/50 h-12 px-3 transition" key={video.id}
              onClick={() => {
                route.push(`/channels/${video.serverId}/${video.id}`)
              }}
            >
              <div className="flex justify-start items-center gap-x-2">
                <div className="w-6 h-6 flex justify-center items-center bg-zinc-300 dark:bg-zinc-800 p-1 rounded-md">
                  <Video className="w-4 h-4 text-green-800 " />
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{video.name}</p>
              </div>
            </div>
          ))

      }
    </div>
  )
}

export default VideoChannel

