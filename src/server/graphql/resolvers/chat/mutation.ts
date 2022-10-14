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

export const ChatMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createChat', {
      type: 'Chat',
      args: {
        toUserId: nonNull(intArg()),
        message: nonNull(stringArg()),
      },
      resolve: async (_, { toUserId, message }, ctx) => {
        // check if chatroom already exists
        const room = await prisma.chatRoom.findFirst({
          where: {
            users: {
              every: {
                id: {
                  in: [ctx.userId, toUserId],
                },
              },
            },
          },
          select: {
            id: true,
          },
        })
        if (room) {
          try {
            return await prisma.chat.create({
              data: {
                message,
                room: {
                  connect: {
                    id: room.id,
                  },
                },
                user: {
                  connect: {
                    id: ctx.userId,
                  },
                },
              },
            })
          } catch (error) {
            throw new ApolloError(error)
          }
        }
        // create new chatroom
        else {
          try {
            const room = await prisma.chatRoom.create({
              data: {
                users: {
                  connect: [
                    {
                      id: ctx.userId,
                    },
                    {
                      id: toUserId,
                    },
                  ],
                },
              },
            })
            return await prisma.chat.create({
              data: {
                message,
                room: {
                  connect: {
                    id: room.id,
                  },
                },
                user: {
                  connect: {
                    id: ctx.userId,
                  },
                },
              },
            })
          } catch (error) {
            throw new ApolloError(error)
          }
        }
      },
    })
  },
})
