import gql from 'graphql-tag'
import { CHATROOM_FRAGMENT } from '@client/shared/queries'

export const CHATROOMS_QUERY = gql`
  query ($skip: Int, $take: Int) {
    chatRooms(skip: $skip, take: $take) {
      ${CHATROOM_FRAGMENT}
    }
  }
`

export const CREATE_CHATROOM_MUTATION = gql`
  mutation Mutation($toUserId: Int!) {
    createChatRoom(toUserId: $toUserId) {
      id
    }
  }
`
