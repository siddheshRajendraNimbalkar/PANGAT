import { Server,Member,Profile } from '@prisma/client'

export type ServerWithProfile = Server & {
    member:(Member & {profile:Profile})[]
}