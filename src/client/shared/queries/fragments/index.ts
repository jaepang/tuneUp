export const SHOWREQUEST_FRAGMENT = `
  id
  available
  createdAt
  date
  desc
  place
  budget
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
  desc
  request {
    ${SHOWREQUEST_FRAGMENT}
  }
`

export const CHAT_FRAGMENT = `
  id
  createdAt
  message
  read
  user {
    ${USER_FRAGMENT}
  }
`

export const CHATROOM_FRAGMENT = `
  id
  users {
    ${USER_FRAGMENT}
  }
  chats {
    id
    read
  }
`
