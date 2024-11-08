import findChannel from '@/actions/findChannel'
import { redirect } from 'next/navigation'
import React from 'react'



const page = async({params}:any) => {
  const {channelsId} = params
  const server = await findChannel(channelsId)

  if(server.found === false){
    return <div>Not Found</div>
  }
  
  redirect(`/channels/${channelsId}/${server.data?.id}`)

}

export default page