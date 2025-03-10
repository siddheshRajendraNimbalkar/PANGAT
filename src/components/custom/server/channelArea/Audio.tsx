'use client'

import { Mic, Plus, Trash, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { NaveTooll } from '../../NaveTooll'
import deleteServerChannel from '@/actions/deleteServerChannel'

interface AudioProps {
    serverId: string
    id: string
    name: string
}

const Audio = ({data}:{data:AudioProps[]}) => {
    const route = useRouter();
  return (
    <div>
      <h1 className="text-lg text-zinc-500 dark:text-zinc-400 bg-zinc-300 dark:bg-zinc-900/50 pt-2 pb-2 flex justify-between items-center px-2">
        <div>
          Audio Channels
        </div>
        <Mic className="w-6 h-6 text-rose-800 " />
      </h1>
      {
        data?.length == 0 ? null :
          data?.map((audio) => (
            <div className="w-full flex justify-between items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-900/50 h-12 px-3 transition" key={audio.id}
                onClick={()=>{
                    route.push(`/channels/${audio.serverId}/${audio.id}`)
                }}
            >
              <div className="w-full flex justify-start items-center gap-x-2">
                <div className="w-6 h-6 flex justify-center items-center bg-zinc-300 dark:bg-zinc-800 p-1 rounded-md">
                  <Mic className="w-4 h-4 text-rose-800 " />
                </div>
                <div className='w-full flex justify-between items-center'>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">{audio.name}</div>
                <div className='flex gap-x-2' >
                <NaveTooll serverName="Delete">
                      <Trash className="w-6 h-6 text-zinc-700 cursor-pointer dark:text-zinc-200 dark:bg-rose-700 bg-rose-700/50 p-1 rounded-md" 
                        onClick={() => {
                          deleteServerChannel(audio.id).then((res) => {
                            console.log(res)
                          })
                        }}
                      />
                    </NaveTooll>
                    
                </div>
                </div>
              </div>
            </div>
          ))

      }
    </div>
  )
}

export default Audio

