import { extendType } from 'nexus'
import prisma from '@server/prisma'

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('usersBySearchParam', {
      type: 'User',
      args: {
        searchParam: 'String',
      },
      resolve: (_, { searchParam }, ctx) => {
        return prisma.user.findMany({
          where: {
            name: {
              contains: searchParam,
            },
            id: {
              not: ctx.userId,
            },
          },
        })
      },
    })
    t.field('userInfo', {
      type: 'User',
      args: {
        userId: 'Int',
      },
      resolve: (_, { userId }, ctx) => {
        return prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            request: true,
          },
        })
      },
    })
  },
})
