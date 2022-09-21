import gql from 'graphql-tag'
import { USER_FRAGMENT } from '@client/shared/queries'

export const ME_QUERY = gql`
  query me {
    me {
      ${USER_FRAGMENT}
    }
  }
`
