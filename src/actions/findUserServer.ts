'use server';

import db from "@/lib/db";
import { redirect } from "next/navigation";
import currentUser from "./currentUser";

export const findUserServer = async () => {
  const profile = await currentUser();
  if (!profile) {
    redirect('/');
  }
  
  try {
    const allServer = await db.server.findMany({
      where: {
        member: {
          some: {
            profileId: profile.id
          }
        }
      }
    });

    if (!allServer || allServer.length === 0) {
      return { success: false, error: 'No servers found' };
    }

    return { success: true, servers: allServer };
  } catch (error) {
    console.log('[ERROR WHILE FINDING SERVER]: ', error);
    return { success: false, error: error };
  }
};
