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
        cursorId: intArg(),
        roomId: nonNull(intArg()),
      },
      resolve: (_, { skip, take, cursorId, roomId }, ctx) => {
        return prisma.chat.findMany({
          skip,
          take,
          cursor: cursorId ? { id: cursorId } : undefined,
          where: {
            room: {
              id: roomId,
            },
          },
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
      },
    })
  },
})
