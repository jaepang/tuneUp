import gql from 'graphql-tag'
import { USER_FRAGMENT } from '@client/shared/queries'

export const USERS_BY_SEARCH_PARAM_QUERY = gql`
  query ($searchParam: String) {
    usersBySearchParam(searchParam: $searchParam) {
      id
      profileImg
      name
    }
  }
`

export const USER_INFO_QUERY = gql`
  query ($userId: Int) {
    userInfo(userId: $userId) {
      ${USER_FRAGMENT}
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation ($id: Int!, $email: String, $name: String, $profileImg: String, $school: String, $desc: String, $password: String) {
    updateUser(id: $id, email: $email, name: $name, profileImg: $profileImg, school: $school, desc: $desc, password: $password) {
      ${USER_FRAGMENT}
    }
  }
`
