'use client'

import { Hash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface TextProps{
  name:string
  id:string
  serverID:string
}

const Text = ({data}:{data:TextProps[]}) => {
  const route = useRouter();
  return (
    <div>
      <h1 className="text-lg text-zinc-500 dark:text-zinc-400 bg-zinc-300 dark:bg-zinc-900/50 pt-2 pb-2 flex justify-between items-center px-2">
        <div>
          Audio Channels
        </div>
        <Hash className="w-6 h-6 text-zinc-800 dark:text-zinc-200" />
      </h1>
      {
        data?.length == 0 ? null :
          data?.map((text) => (
            <div className="flex justify-between items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-900/50 h-12 px-3 transition" key={text.id}
              onClick={()=>{
                route.push(`/channels/${text.serverID}/${text.id}`)
              }}
            >
              <div className="flex justify-start items-center gap-x-2">
                <div className="w-6 h-6 flex justify-center items-center bg-zinc-300 dark:bg-zinc-800 p-1 rounded-md">
                  <Hash className="w-4 h-4 text-zinc-800 dark:text-zinc-200 " />
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{text.name}</p>
              </div>
            </div>
          ))

      }
    </div>
  )
}

export default Text
