import { extendType, intArg } from 'nexus'
import prisma from '@server/prisma'

export const ShowRequestQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('requestFeed', {
      type: 'ShowRequest',
      args: {
        skip: intArg(),
        take: intArg(),
        cursorId: intArg(),
      },
      resolve: (_, { skip, take, cursorId }, ctx) => {
        return prisma.showRequest.findMany({
          skip,
          take,
          cursor: cursorId ? { id: cursorId } : undefined,
          where: {
            available: true,
            NOT: {
              club: {
                id: ctx.userId,
              },
            },
          },
          include: {
            club: true,
          },
        })
      },
    })

    t.field('myPageRequest', {
      type: 'ShowRequest',
      resolve: (_, {}, ctx) => {
        return prisma.showRequest.findFirst({
          where: {
            club: {
              id: ctx.userId,
            },
          },
        })
      },
    })
  },
})
