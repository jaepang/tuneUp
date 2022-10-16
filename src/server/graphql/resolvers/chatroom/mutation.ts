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

export const ChatRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createChatRoom', {
      type: 'ChatRoom',
      args: {
        toUserId: nonNull(intArg()),
      },
      resolve: async (_, { toUserId }, ctx) => {
        console.log(ctx.userId, toUserId)
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
          return room
        }
        // create new chatroom
        else {
          try {
            return await prisma.chatRoom.create({
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
          } catch (error) {
            throw new ApolloError(error)
          }
        }
      },
    })
  },
})
