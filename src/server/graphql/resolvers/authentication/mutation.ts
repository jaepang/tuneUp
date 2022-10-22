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
import { sendPasswordRecoveryEmail } from './utils'

export const AuthenticationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { email, name, password }, ctx) => {
        try {
          const hashedPassword = await hash(password, 10)

          // 이메일로 유저 검색
          const existingUser = await prisma.user.findUnique({
            where: {
              email,
            },
          })

          if (!existingUser) {
            // 탈퇴한 적 없고 신규 유저라면
            const user = await prisma.user.create({
              data: {
                email,
                name,
                password: hashedPassword,
              },
            })

            const token = generateToken({ userId: user.id })

            return {
              token,
              user,
            }
          } else {
            // 탈퇴한 적 있다면
            const user = await prisma.user.update({
              where: {
                email,
              },
              data: {
                name,
                password: hashedPassword,
              },
            })

            const token = generateToken({ userId: user.id })

            return {
              token,
              user,
            }
          }
        } catch (e: any) {
          if (e.code === 'P2002') {
            throw new ApolloError('Duplicate email')
          }
          throw new ApolloError('Signup failed')
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { email, password }, ctx) => {
        // 이메일로 유저 검색
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (!user) {
          throw new ApolloError('User not found', null, {
            extraCode: 'USER_NOT_FOUND',
          })
        }

        // 패스워드 비교
        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) {
          throw new ApolloError('Invalid password', null, {
            extraCode: 'INVALID_PASSWORD',
          })
        }

        // 토큰 생성 후 전달
        const token = generateToken({ userId: user.id })
        return {
          token,
          user,
        }
      },
    })

    t.field('updateUser', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
        email: stringArg(),
        name: stringArg(),
        profileImg: stringArg(),
        school: stringArg(),
        desc: stringArg(),
        password: stringArg(),
      },
      resolve: async (_, { id, email, name, profileImg, school, desc, password }, ctx) => {
        let hashedPassword = undefined

        if (password) {
          hashedPassword = await hash(password, 10)
        }

        return prisma.user.update({
          where: {
            id,
          },
          data: {
            email,
            name,
            profileImg,
            school,
            desc,
            password: hashedPassword,
          },
        })
      },
    })

    t.field('passwordRecovery', {
      type: 'Boolean',
      args: {
        email: nonNull(stringArg()),
      },
      resolve: async (_, { email }, ctx) => {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          })

          if (!user) {
            throw new ApolloError('USER_NOT_FOUND')
          }

          return await sendPasswordRecoveryEmail(user)
        } catch (e: any) {
          throw new ApolloError(e)
        }
      },
    })

    t.field('changePassword', {
      type: 'AuthPayload',
      args: {
        id: nonNull(intArg()),
        password: nonNull(stringArg()),
        newPassword: nonNull(stringArg()),
      },
      resolve: async (_, { id, password, newPassword }, ctx) => {
        let user = null
        try {
          user = await prisma.user.findUnique({
            where: {
              id,
            },
          })
        } catch (e) {
          throw Error('invalid_user')
        }

        if (!user) {
          throw Error('invalid_user')
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw Error('invalid_password')
        }
        const hashedPassword = await hash(newPassword, 10)
        user = await prisma.user.update({
          where: { id },
          data: {
            password: hashedPassword,
          },
        })
        const token = generateToken({ userId: user.id })
        return {
          token,
          user,
        }
      },
    })
  },
})
