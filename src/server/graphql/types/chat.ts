import { objectType } from 'nexus'

export const Chat = objectType({
  name: 'Chat',
  definition(t) {
    t.int('id')
    t.date('createdAt')
    t.string('message')

    t.field('room', { type: 'ChatRoom' })
    t.field('user', { type: 'User' })
  },
})
