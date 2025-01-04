import React from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import axios from 'axios'

interface ChatProps {
  id: string,
  profile1: {
    id: string,
    username: string,
    imageUrl: string,
  }
  profile2: {
    id: string,
    username: string,
    imageUrl: string,
  }
  channel: {
    id: string,
    name: string,
    imageUrl: string,
  }
}



const Chat = ({ id, profile1, profile2, channel }: ChatProps) => {
  
  return (
    <div>
      <ChatHeader 
        id={profile2.id} 
        name={profile1.username}
        friendName={profile2.username}
        channelName={channel.name} 
        otherProfileImage={profile2.imageUrl}
        yourProfileImage={profile1.imageUrl}
        channelProfileImage={channel.imageUrl}
      />
      <ChatBody />
    </div>
  )
}

export default Chat