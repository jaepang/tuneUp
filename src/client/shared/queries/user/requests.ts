import { NexusGenArgTypes, NexusGenObjects } from '@shared/generated/nexus-typegen'
import { graphQLClient } from '@client/utils'
import { USERS_BY_SEARCH_PARAM_QUERY } from './tags'

export const usersBySearchParamQuery = async (
  variables: NexusGenArgTypes['Query']['usersBySearchParam'],
): Promise<{ usersBySearchParam: NexusGenObjects['User'][] }> => {
  return await graphQLClient.request(USERS_BY_SEARCH_PARAM_QUERY, variables)
}
