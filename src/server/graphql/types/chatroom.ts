import { objectType } from 'nexus'

export const ChatRoom = objectType({
  name: 'ChatRoom',
  definition(t) {
    t.int('id')
    t.date('createdAt')
    t.date('updatedAt')

    t.list.field('users', { type: 'User' })
    t.list.field('chats', { type: 'Chat' })
  },
})
