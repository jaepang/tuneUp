import gql from 'graphql-tag'
import { USER_FRAGMENT, SHOWREQUEST_FRAGMENT } from '@client/shared/queries'

export const FEED_QUERY = gql`
  query($skip: Int, $take: Int) {
    requestFeed(skip: $skip, take: $take) {
      ${SHOWREQUEST_FRAGMENT}
    }
  }
`