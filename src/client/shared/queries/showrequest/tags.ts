import gql from 'graphql-tag'
import { SHOWREQUEST_FRAGMENT } from '@client/shared/queries'

export const FEED_QUERY = gql`
  query($skip: Int, $take: Int, $cursorId: Int) {
    requestFeed(skip: $skip, take: $take, cursorId: $cursorId) {
      ${SHOWREQUEST_FRAGMENT}
    }
  }
`

export const MYPAGE_REQUEST_QUERY = gql`
  query {
    myPageRequest {
      ${SHOWREQUEST_FRAGMENT}
    }
  }
`

export const CREATE_OR_UPDATE_SHOWREQUEST_MUTATION = gql`
  mutation($id: Int, $available: Boolean!, $date: DateTime!, $place: String!, $desc: String!, $budget: Int!) {
    createOrUpdateShowRequest(id: $id, available: $available, date: $date, place: $place, desc: $desc, budget: $budget) {
      ${SHOWREQUEST_FRAGMENT}
    }
  }
`

export const DELETE_SHOWREQUEST_MUTATION = gql`
  mutation ($id: Int!) {
    deleteShowRequest(id: $id) {
      ${SHOWREQUEST_FRAGMENT}
    }
  }
`
