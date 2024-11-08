"use server"

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createUser() {
   const user = await currentUser();
   try{

  if(!user){
    return redirect('/sign-in')
  }

  const profile = await db.profile.findUnique({
    where:{
      userId:user.id
    }
  })
  if(profile){
    return profile
  }

  const newUser = await db.profile.create({
    data:{
      userId:user.id,
      email:user.emailAddresses[0].emailAddress,
      name: `${user.firstName+" "+user.lastName}`,
      imageUrl:user.imageUrl,
      password:""
    }
  })

  if(!newUser){
    return false
  }

   return newUser;
   } catch(error){
    console.log('[ERROR]: ',error)
    return error
   }
  }
