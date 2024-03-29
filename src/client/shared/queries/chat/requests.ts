import { NexusGenArgTypes, NexusGenObjects } from '@shared/generated/nexus-typegen'
import { graphQLClient } from '@client/utils'
import { CHATS_QUERY, CREATE_CHAT_MUTATION, READ_CHATS_MUTATION } from './tags'

export const chatsQuery = async (
  variables: NexusGenArgTypes['Query']['chats'],
): Promise<{ chats: NexusGenObjects['Chat'][] }> => {
  return await graphQLClient.request(CHATS_QUERY, variables)
}

export const createChatMutation = async (
  variables: NexusGenArgTypes['Mutation']['createChat'],
): Promise<{ createChat: NexusGenObjects['Chat'] }> => {
  return await graphQLClient.request(CREATE_CHAT_MUTATION, variables)
}

export const readChatsMutation = async (
  variables: NexusGenArgTypes['Mutation']['readChat'],
): Promise<{ readChat: number }> => {
  return await graphQLClient.request(READ_CHATS_MUTATION, variables)
}
