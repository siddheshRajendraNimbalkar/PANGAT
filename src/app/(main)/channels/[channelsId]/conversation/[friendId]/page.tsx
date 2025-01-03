import axios from 'axios';
import currentUser from '@/actions/currentUser';
import Chat from '@/components/Chats/Chat';
import db from '@/lib/db';
import { RedirectToSignIn } from '@clerk/nextjs';
import { Axis3DIcon } from 'lucide-react';

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
    where:{
      id:params.channelsId
    }
  })

  if (!channel) {
    return <RedirectToSignIn redirectUrl="/" />;
  }
  
  try {
    const res = await axios.post(`${process.env.GOSERVER}/conversation`, {
      channelId: channel.id,
      memberIdOne: profile1.id,
      memberIdTwo: profile2.id,
      memberNameOne: profile1.name,
      memberNameTwo: profile2.name,
    });

    if (res.data.success == true) {
      console.log(res.data.data);
    }
  } catch (err) {
    console.error('Error in creating/retrieving conversation:', err)
    return <div>Error in creating/retrieving conversation</div>
  }

  return (
    <div className='h-full bg-zinc-100 text-zinc-800 dark:bg-[#303339] dark:text-[#8C8C90]'>
      <Chat 
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
