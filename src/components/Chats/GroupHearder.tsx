import { Hash } from 'lucide-react'
import React from 'react'

const GroupHearder = ({name}:{name:string}) => {
  return (
    <div className="relative flex items-center space-x-2 p-2 px-2 bg-zinc-200 dark:bg-[#232429] h-12 border-b border-gray-200 dark:border-gray-800">
        <div className='p-1 bg-zinc-300 dark:bg-zinc-800 rounded-md'> 
         <Hash className="w-6 h-6 text-zinc-950 dark:text-zinc-200 " />
        </div>
         <div className='text-2xl text-zinc-500 dark:text-zinc-200'>{name}</div>
    </div>
  )
}

export default GroupHearder