import { extendType, intArg, nonNull } from 'nexus'
import prisma from '@server/prisma'

export const ChatQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('chats', {
      type: 'Chat',
      args: {
        skip: intArg(),
        take: intArg(),
        roomId: nonNull(intArg()),
      },
      resolve: (_, { skip, take, roomId }, ctx) => {
        return prisma.chat.findMany({
          skip,
          take,
          where: {
            room: {
              id: roomId,
            },
          },
        })
      },
    })
  },
})
