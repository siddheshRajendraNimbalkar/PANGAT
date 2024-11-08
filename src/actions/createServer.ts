'use server'

import currentUser from "./currentUser";
import db from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';
import { MemberRole } from "@prisma/client";

interface ServerResponse {
    success: boolean;
    user?: string;
    id?: string;
    message?: string;
}

const createServer = async (data: { name: string; imageUrl: string }): Promise<ServerResponse> => {
    try {
        const user = await currentUser();
        if (!user) {
            return { success: false, user: 'user not found' };
        }
        const newServer = await db.server.create({
            data: {
                name: data.name,
                imageUrl: data.imageUrl,
                invitationCode: uuidv4(),
                profileId: user?.id,
                channel: {
                    create: [
                        {
                            name: "general",
                            profileId: user.id,
                        }
                    ]
                },
                member: {
                    create: [
                        {
                            profileId: user.id,
                            role: MemberRole.ADMIN
                        }
                    ]
                }
            }
        });

        if (!newServer) {
            return { success: false };
        }
        return { success: true, id: newServer.id };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
};

export default createServer;