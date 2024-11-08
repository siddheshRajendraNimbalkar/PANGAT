'use client'

import React from 'react'
import NaveBarServer from './NaveBarServer'
import NaveBarUser from './NaveBarUser'
import NaveCreateServer from './NaveCreateServer'

const NaveBar = () => {
  return (
    <>
        <div className='flex flex-col h-full justify-between'>
        <div>
        <NaveCreateServer />
        <NaveBarServer />
        </div>
        <NaveBarUser />
        </div>
    </>
  )
}

export default NaveBar