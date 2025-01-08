import db from '@/lib/db'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import currentUser from '@/actions/currentUser';
import { RedirectToSignIn } from '@clerk/nextjs';
import Chat from '@/components/Chats/Chat';
import { ChannelType } from '@prisma/client';
import { MediaRoom } from '@/components/ui/media-room';


const page = async ({ params }: any) => {

  const profile1 = await currentUser();

  if (!profile1) {
    return <RedirectToSignIn redirectUrl="/" />;
  }

  const { subChannel, channelsId } = params

  if (!subChannel) {
    <div className='text-4xl'>
      Not Found
    </div>
  }

  const chanel = await db.channel.findUnique({
    where: {
      id: subChannel
    }
  })

  if (!chanel) {
    return <div className='text-4xl'>
      Not Found
    </div>
  }

  const server = await db.server.findUnique({
    where: {
      id: channelsId
    }
  })

  if (!server) {
    return <div className='text-4xl'>
      Not Found
    </div>
  }
  if (chanel.type == ChannelType.AUDIO) {
    return <MediaRoom
      chatId={chanel.id}
      video={false}
      audio={true}
    />
  } else if (chanel.type == ChannelType.TEXT) {
    let loading = true;
    try {
      const res= await axios.post(`${process.env.GOSERVER}/group`, {
        "groupId": chanel.id,
        "userId": profile1?.id
      })

      if (res.data.success == false) {
        return <div className='flex justify-center items-center h-full bg-zinc-900'>
          <Card>
            <CardHeader>
              <CardTitle className='text-red-500'>Something Went Wrong!!</CardTitle>
              <CardDescription className='pt-4'>Error While Connecting to User</CardDescription>
              <CardContent className='p-4'>
                <div className='flex justify-center'>
                  <Image src="/connection.jpg" alt="Error" width={500} height={500} />
                </div>
                <div>
                  <Button>Try Again Later</Button>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      }
      else if (res.data.success == true) {
        return ( 
        <Chat
          id={`g${res.data.data.ID.toString()}`}
          profile1={{
            id: profile1.id,
            username: profile1.name,
            imageUrl: profile1.imageUrl
          }}
          channel={{
            id: chanel.id,
            name: chanel.name,
            imageUrl: server.imageUrl
          }}
        />
        )
      }
    } catch (error) {
      return <div className='flex justify-center items-center h-full bg-zinc-900'>
        <Card>
          <CardHeader>
            <CardTitle className='text-red-500'>Something Went Wrong!!</CardTitle>
            <CardDescription className='pt-4'>Error While Connecting to User</CardDescription>
            <CardContent className='p-4'>
              <div className='flex justify-center'>
                <Image src="/connection.jpg" alt="Error" width={500} height={500} />
              </div>
              <div>
                <Button>Try Again Later</Button>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    }

  } else if (chanel.type == ChannelType.VIDEO) {
    return <MediaRoom
      chatId={chanel.id}
      video={true}
      audio={true}
    />
  }

}

export default page

