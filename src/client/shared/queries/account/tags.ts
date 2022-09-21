import gql from 'graphql-tag'
import { USER_FRAGMENT } from '@client/shared/queries'

export const ME_QUERY = gql`
  query me {
    me {
      ${USER_FRAGMENT}
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        ${USER_FRAGMENT}
      }
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        ${USER_FRAGMENT}
      }
    }
  }
`
