import { NexusGenArgTypes, NexusGenObjects } from '@shared/generated/nexus-typegen'
import { graphQLClient } from '@client/utils'
import { CHATROOMS_QUERY } from './tags'

export const chatRoomsQuery = async ({ queryKey }): Promise<{ chatRooms: NexusGenObjects['ChatRoom'][] }> => {
  const [_, variables] = queryKey
  return await graphQLClient.request(CHATROOMS_QUERY, variables)
}
