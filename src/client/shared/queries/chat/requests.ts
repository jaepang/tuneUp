import { NexusGenArgTypes, NexusGenObjects } from '@shared/generated/nexus-typegen'
import { graphQLClient } from '@client/utils'
import { CHATS_QUERY, CREATE_CHAT_MUTATION } from './tags'

export const chatsQuery = async ({ queryKey }): Promise<{ chats: NexusGenObjects['Chat'][] }> => {
  const [_, variables] = queryKey
  return await graphQLClient.request(CHATS_QUERY, variables)
}

export const createChatMutation = async (
  variables: NexusGenArgTypes['Mutation']['createChat'],
): Promise<{ createChat: NexusGenObjects['Chat'] }> => {
  return await graphQLClient.request(CREATE_CHAT_MUTATION, variables)
}