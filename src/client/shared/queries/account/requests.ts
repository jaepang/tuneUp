import { NexusGenObjects } from '@shared/generated/nexus-typegen'
import { graphQLClient } from '@client/utils'
import { ME_QUERY } from './tags'

export const meQuery = async (): Promise<{ me: NexusGenObjects['User'] }> => {
  return await graphQLClient.request(ME_QUERY)
}
