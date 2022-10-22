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
import { ApolloError } from 'apollo-server-micro'
import { compare, hash } from 'bcryptjs'
import { generateToken } from '@server/apollo/utils'
import prisma from '@server/prisma'

export const ShowRequestMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOrUpdateShowRequest', {
      type: 'ShowRequest',
      args: {
        id: intArg(),
        available: nonNull(booleanArg()),
        date: nonNull(arg({ type: 'DateTime' })),
        place: nonNull(stringArg()),
        desc: nonNull(stringArg()),
        budget: nonNull(intArg()),
      },
      resolve: async (_, { id, available, date, place, desc, budget }, ctx) => {
        if (!id) {
          return await prisma.showRequest.create({
            data: {
              available,
              date,
              place,
              desc,
              budget,
              club: {
                connect: {
                  id: ctx.userId,
                },
              },
            },
          })
        } else {
          return await prisma.showRequest.update({
            where: {
              id,
            },
            data: {
              available,
              date,
              place,
              desc,
              budget,
            },
          })
        }
      },
    })

    t.field('deleteShowRequest', {
      type: 'ShowRequest',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, { id }, ctx) => {
        try {
          return await prisma.showRequest.delete({
            where: {
              id,
            },
          })
        } catch (e) {
          throw new ApolloError(e)
        }
      },
    })
  },
})
