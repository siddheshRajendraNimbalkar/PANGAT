import axios from 'axios';
import currentUser from '@/actions/currentUser';
import Chat from '@/components/Chats/Chat';
import db from '@/lib/db';
import { RedirectToSignIn } from '@clerk/nextjs';
import { Axis3DIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Page = async ({ params }: { params: { friendId: string; channelsId: string } }) => {
  const profile1 = await currentUser();

  if (!profile1) {
    return <RedirectToSignIn redirectUrl="/" />;
  }

  const user2 = await db.member.findUnique({
    where: {
      id: params.friendId,
    },
  });

  const profile2 = await db.profile.findUnique({
    where: {
      id: user2?.profileId,
    },
  });

  if (!profile2) {
    return <RedirectToSignIn redirectUrl="/" />;
  }

  const channel = await db.server.findUnique({
    where: {
      id: params.channelsId
    }
  })

  if (!channel) {
    return <RedirectToSignIn redirectUrl="/" />;
  }
  var conversationId;
  let loading = true;
  try {
    const res = await axios.post(`${process.env.GOSERVER}/conversation`, {
      channelId: channel.id,
      memberIdOne: profile1.id,
      memberIdTwo: profile2.id,
      memberNameOne: profile1.name,
      memberNameTwo: profile2.name,
      memberImageOne: profile1.imageUrl,
      memberImageTwo: profile2.imageUrl,
    });
    
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

    } else if (res.data.success == true) {
      conversationId = res.data.data.ID;
      loading = false;
    }
  } catch (err) {
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

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='h-full bg-zinc-100 text-zinc-800 dark:bg-[#303339] dark:text-[#8C8C90]'>
      <Chat
        id={conversationId.toString()}
        profile1={{
          id: profile1.id,
          username: profile1.name,
          imageUrl: profile1.imageUrl,
        }}
        profile2={{
          id: profile2.id,
          username: profile2.name,
          imageUrl: profile2.imageUrl,
        }}
        channel={{
          id: channel.id,
          name: channel.name,
          imageUrl: channel.imageUrl,
        }}
      />
    </div>
  );
};

export default Page;