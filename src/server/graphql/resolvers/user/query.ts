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
  },
})
