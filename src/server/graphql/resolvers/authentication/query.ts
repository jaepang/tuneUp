import {
  asNexusMethod,
  makeSchema,
  nonNull,
  nullable,
  objectType,
  extendType,
  list,
  stringArg,
  intArg,
  booleanArg,
  arg,
} from 'nexus'
import prisma from '@server/prisma'

export const AuthenticationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve: (_, __, ctx) => {
        return prisma.user.findUnique({
          where: {
            id: ctx.userId,
          },
        })
      },
    })
  },
})
