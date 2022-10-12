import { NexusGenArgTypes, NexusGenObjects } from '@shared/generated/nexus-typegen'
import { graphQLClient } from '@client/utils'
import { FEED_QUERY } from './tags'

export const requestsQuery = async (
  variables: NexusGenArgTypes['Query']['requestFeed'],
): Promise<{ requestFeed: NexusGenObjects['ShowRequest'][] }> => {
  return await graphQLClient.request(FEED_QUERY, variables)
}
