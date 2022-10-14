export const SHOWREQUEST_FRAGMENT = `
  id
  available
  createdAt
  date
  desc
  place
  club {
    id
    email
    name
    profileImg
    school
  }
`

export const USER_FRAGMENT = `
  id
  email
  name
  profileImg
  school
  requests {
    ${SHOWREQUEST_FRAGMENT}
  }
`

export const CHAT_FRAGMENT = `
  id
  message
  createdAt
  user {
    ${USER_FRAGMENT}
  }
`

export const CHATROOM_FRAGMENT = `
  id
  users {
    ${USER_FRAGMENT}
  }
`
