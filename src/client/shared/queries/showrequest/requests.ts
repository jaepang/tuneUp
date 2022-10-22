import { NexusGenArgTypes, NexusGenObjects } from '@shared/generated/nexus-typegen'
import { graphQLClient } from '@client/utils'
import {
  FEED_QUERY,
  MYPAGE_REQUEST_QUERY,
  CREATE_OR_UPDATE_SHOWREQUEST_MUTATION,
  DELETE_SHOWREQUEST_MUTATION,
} from './tags'

export const requestFeedQuery = async (
  variables: NexusGenArgTypes['Query']['requestFeed'],
): Promise<{ requestFeed: NexusGenObjects['ShowRequest'][] }> => {
  return await graphQLClient.request(FEED_QUERY, variables)
}

export const myPageRequestQuery = async (): Promise<{ myPageRequest: NexusGenObjects['ShowRequest'] }> => {
  return await graphQLClient.request(MYPAGE_REQUEST_QUERY)
}

export const createOrUpdateShowRequestMutation = async (
  variables: NexusGenArgTypes['Mutation']['createOrUpdateShowRequest'],
): Promise<{ createOrUpdateShowRequest: NexusGenObjects['ShowRequest'] }> => {
  return await graphQLClient.request(CREATE_OR_UPDATE_SHOWREQUEST_MUTATION, variables)
}

export const deleteShowRequestMutation = async (
  variables: NexusGenArgTypes['Mutation']['deleteShowRequest'],
): Promise<{ deleteShowRequest: NexusGenObjects['ShowRequest'] }> => {
  return await graphQLClient.request(DELETE_SHOWREQUEST_MUTATION, variables)
}
