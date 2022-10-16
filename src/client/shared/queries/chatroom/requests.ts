import { NexusGenArgTypes, NexusGenObjects } from '@shared/generated/nexus-typegen'
import { graphQLClient } from '@client/utils'
import { CHATROOMS_QUERY, CREATE_CHATROOM_MUTATION } from './tags'

export const chatRoomsQuery = async ({ queryKey }): Promise<{ chatRooms: NexusGenObjects['ChatRoom'][] }> => {
  const [_, variables] = queryKey
  return await graphQLClient.request(CHATROOMS_QUERY, variables)
}

export const createChatRoomMutation = async (
  variables: NexusGenArgTypes['Mutation']['createChatRoom'],
): Promise<{ createChatRoom: NexusGenObjects['ChatRoom'] }> => {
  return await graphQLClient.request(CREATE_CHATROOM_MUTATION, variables)
}
