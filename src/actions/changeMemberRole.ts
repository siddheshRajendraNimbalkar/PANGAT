'use server'
import db from "@/lib/db";
import currentUser from "./currentUser";
import { MemberRole } from "@prisma/client";

const changeMemberRole = async ({ serverId, id, role }: { serverId: string; id: string; role: MemberRole }) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, message: "No authenticated user" };
    }

    if (!serverId || !id) {
      console.log("Missing serverId or id:", { serverId, id });
      return { success: false, message: "Server ID or member ID is missing" };
    }

    const updateData = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        member: {
          update: {
            where: {
              id: id,
            },
            data: {
              role: role,
            },
          },
        },
      },
    });

    if (!updateData) {
      return { success: false, message: "Something went wrong" };
    }

    return { success: true, message: "Done" };
  } catch (err) {
    console.log("[ERROR UPDATING MEMBER]:", err);
    return { err: err };
  }
};

export default changeMemberRole;
