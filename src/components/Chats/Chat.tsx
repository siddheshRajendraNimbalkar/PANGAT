'use client'
import React, { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import GroupHearder from './GroupHearder'
import GroupBody from './GroupBody'

interface ChatProps {
  id: string,
  profile1: {
    id: string,
    username: string,
    imageUrl: string,
  }
  profile2?: {
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

  if (profile2 == undefined) {
    return <div>
      <GroupHearder name={channel.name} />
      <GroupBody id={id} profile1={profile1} channel={channel} />
    </div>
  } else {
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

        <ChatBody
          id={id}
          profile1={profile1}
          profile2={profile2}
          channel={channel}
        />
      </div>
    )
  }
}

export default Chat
