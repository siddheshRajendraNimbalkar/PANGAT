import db from '@/lib/db'
import React from 'react'

const page = async({params}:any) => {
  const {subChannel} = params
  
  if(!subChannel){
    <div className='text-4xl'>
      Not Found
    </div>
  }

  const chanel = await db.channel.findUnique({
    where:{
      id:subChannel
    }
  })

  if(!chanel){
    <div className='text-4xl'>
      Not Found
    </div>
  }

  return (
    <div className='text-4xl h-full w-full bg-zinc-200 dark:bg-zinc-800'>
      {chanel?.name}
    </div>
  )

}

export default page
