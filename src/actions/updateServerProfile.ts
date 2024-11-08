'use server'

import currentUser from "./currentUser";
import db from "@/lib/db";


const updateServerProfile = async (data: { name: string; imageUrl: string },serverId:string) => {
   const user = await currentUser();
   if(!user){
    return {sucess:false}
   }

   const updateServer = await db.server.update({
    where: {
      id: serverId,
    },
    data: {
      name: data.name,
      imageUrl:data.imageUrl
    },
  })

  console.log(updateServer)

  if(!updateServer){
    return {sucess:false}
   }

    return {sucess:true}

};

export default updateServerProfile;