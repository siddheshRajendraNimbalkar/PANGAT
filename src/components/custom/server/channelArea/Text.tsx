'use client'

import { Hash, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { NaveTooll } from '../../NaveTooll'
import deleteServerChannel from '@/actions/deleteServerChannel'

interface TextProps {
  name: string
  id: string
  serverID: string
}

const Text = ({ data }: { data: TextProps[] }) => {
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
            <div className="flex justify-between items-center w-full gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-900/50 h-12 px-3 transition" key={text.id}
              onClick={() => {
                route.push(`/channels/${text.serverID}/${text.id}`)
              }}
            >
              <div className="flex justify-start w-full items-center gap-x-2">
                <div className="w-6 h-6 flex justify-center items-center bg-zinc-300 dark:bg-zinc-800 p-1 rounded-md">
                  <Hash className="w-4 h-4 text-zinc-800 dark:text-zinc-200 " />
                </div>
                <div className='w-full  flex justify-between items-center'>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">{text.name}</div>
                  <div className='flex gap-x-2'>
                    <NaveTooll serverName="Delete">
                      <Trash className="w-6 h-6 text-zinc-700 cursor-pointer dark:text-zinc-200 dark:bg-rose-700 bg-rose-700/50 p-1 rounded-md" 
                        onClick={() => {
                          deleteServerChannel(text.id).then((res) => {
                            console.log(res)
                          })
                        }}
                      />
                    </NaveTooll>
                    <NaveTooll serverName="Change Type">
                      <Plus className="w-6 h-6 text-zinc-800 cursor-pointer dark:text-zinc-200 dark:bg-green-900 bg-green-900/50 p-1 rounded-md" />
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

export default Text
