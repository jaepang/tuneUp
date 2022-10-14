import gql from 'graphql-tag'
import { CHAT_FRAGMENT } from '@client/shared/queries'

export const CHATS_QUERY = gql`
  query ($skip: Int, $take: Int, $roomId: Int!) {
    chats(skip: $skip, take: $take, roomId: $roomId) {
      ${CHAT_FRAGMENT}
    }
  }
`

export const CREATE_CHAT_MUTATION = gql`
  mutation ($toUserId: Int!, $message: String!) {
    createChat(toUserId: $toUserId, message: $message) {
      ${CHAT_FRAGMENT}
    }
  }
`
