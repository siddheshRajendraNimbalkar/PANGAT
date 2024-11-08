'use client'

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React from 'react'
import { NaveTooll } from './NaveTooll';

const NaveCreateServer = () => {
    const router = useRouter();
  return (
    <div className='h-16 w-full flex justify-center items-center ' >
      <div className='dark:bg-[#303339] dark:text-[#258047] dark:hover:text-[#303339] dark:hover:bg-[#258047] bg-[#258047]  text-white cursor-pointer hover:bg-white hover:text-[#258047] rounded-full h-10 w-10 flex justify-center items-center'
      onClick={()=>{
        router.push('/channels')
    }}
      >
        <NaveTooll serverName="create server">
        <Plus />
        </NaveTooll>
      </div>
    </div>
  )
}

export default NaveCreateServer