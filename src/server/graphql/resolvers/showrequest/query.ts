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
      },
      resolve: (_, { skip, take }, ctx) => {
        return prisma.showRequest.findMany({
          skip,
          take,
          include: {
            club: true,
          },
        })
      },
    })
  },
})
