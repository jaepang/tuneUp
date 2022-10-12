import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('email')
    t.string('name')
    t.string('profileImg')
    t.string('school')

    t.list.field('requests', { type: 'ShowRequest' })
    t.list.field('chatrooms', { type: 'ChatRoom' })
    t.list.field('chats', { type: 'Chat' })
  },
})
