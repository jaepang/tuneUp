import { objectType } from 'nexus'

export const ShowRequest = objectType({
  name: 'ShowRequest',
  definition(t) {
    t.int('id')
    t.boolean('available')
    t.date('createdAt')
    t.date('date')
    t.string('place')
    t.string('desc')
    t.int('budget')

    t.field('club', { type: 'User' })
  },
})
