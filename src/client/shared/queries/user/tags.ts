import gql from 'graphql-tag'

export const USERS_BY_SEARCH_PARAM_QUERY = gql`
  query ($searchParam: String) {
    usersBySearchParam(searchParam: $searchParam) {
      id
      profileImg
      name
    }
  }
`
