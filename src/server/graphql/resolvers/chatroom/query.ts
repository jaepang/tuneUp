import { extendType, intArg, nonNull } from 'nexus'
import prisma from '@server/prisma'

export const ChatRoomQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('chatRooms', {
      type: 'ChatRoom',
      args: {
        skip: intArg(),
        take: intArg(),
      },
      resolve: (_, { skip, take }, ctx) => {
        return prisma.chatRoom.findMany({
          skip,
          take,
          where: {
            users: {
              some: {
                id: ctx.userId,
              },
            },
          },
          include: {
            users: true,
            chats: {
              where: {
                AND: [
                  {
                    user: {
                      id: {
                        not: ctx.userId,
                      },
                    },
                  },
                  {
                    read: false,
                  },
                ],
              },
              select: {
                id: true,
                read: true,
              },
            },
          },
        })
      },
    })
  },
})
