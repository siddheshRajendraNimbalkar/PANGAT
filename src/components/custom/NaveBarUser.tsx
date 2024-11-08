'use client'
import React from 'react'
import { ModeToggle } from '../providers/ModeToggle'
import { UserButton } from '@clerk/nextjs'

const NaveBarUser = () => {
  return (
    <>
        <div className='flex flex-col items-center justify-center p-2'>
            <ModeToggle />
            <div className='h-2 w-1'></div>
            <UserButton appearance={{
                elements:{
                    avatarBox:"h-[48px] w-[48px]"
                }
            }}
            afterSignOutUrl="/"
            />
            
        </div>
    </>
  )
}

export default NaveBarUser