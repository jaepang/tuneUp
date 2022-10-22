import { NexusGenArgTypes, NexusGenObjects } from '@shared/generated/nexus-typegen'
import { graphQLClient } from '@client/utils'
import { USERS_BY_SEARCH_PARAM_QUERY, USER_INFO_QUERY, UPDATE_USER_MUTATION } from './tags'

export const usersBySearchParamQuery = async (
  variables: NexusGenArgTypes['Query']['usersBySearchParam'],
): Promise<{ usersBySearchParam: NexusGenObjects['User'][] }> => {
  return await graphQLClient.request(USERS_BY_SEARCH_PARAM_QUERY, variables)
}

export const userInfoQuery = async ({ queryKey }): Promise<{ userInfo: NexusGenObjects['User'] }> => {
  const [_, variables] = queryKey
  return await graphQLClient.request(USER_INFO_QUERY, variables)
}

export const updateUserMutation = async (variables): Promise<{ updateUser: NexusGenObjects['User'] }> => {
  return await graphQLClient.request(UPDATE_USER_MUTATION, variables)
}
