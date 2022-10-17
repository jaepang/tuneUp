import WriteChat from './writeChat'

import { useRef, useEffect } from 'react'
import { useAccount, useObserver, useReactQuerySubscription } from '@client/hooks'
import { useInfiniteQuery, useMutation } from 'react-query'
import { chatsQuery, readChatsMutation } from '@client/shared/queries'
import { queryClient } from '@client/shared/react-query'

import classNames from 'classnames/bind'
import styles from '@components/pages/chat/style/Chat.module.css'
const cx = classNames.bind(styles)
const PAGE_SIZE = 10

export default function ChatRoomBody({ oppositeUser, chatRoomId }) {
  const { me } = useAccount()
  const bottomRef = useRef<HTMLDivElement>(null)
  const { onSubmitHandler } = useReactQuerySubscription(chatRoomId)

  const {
    data: chatsData,
    isLoading: chatsLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['chats', { roomId: chatRoomId }],
    ({ pageParam = 0 }) =>
      chatsQuery({
        roomId: chatRoomId,
        skip: pageParam === 0 ? 0 : 1,
        take: PAGE_SIZE,
        cursorId: pageParam,
      }),
    {
      enabled: !!me && !!chatRoomId,
      getNextPageParam: lastPage => {
        if (lastPage.chats.length < PAGE_SIZE) return undefined
        return lastPage.chats[lastPage.chats.length - 1].id
      },
      staleTime: Infinity,
    },
  )
  const { pages } = chatsData ?? {}
  const chats = pages?.reduce((acc, page) => [...acc, ...page.chats], [])

  const { mutate: readChats } = useMutation(readChatsMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['chats', { roomId: chatRoomId }])
      queryClient.refetchQueries('chatRooms')
    },
  })

  let unreadChatIDs = chats?.filter(chat => chat.user.id !== me?.id && !chat.read).map(chat => chat.id)
  useEffect(() => {
    unreadChatIDs?.length > 0 && readChats({ chatIDs: unreadChatIDs })
    unreadChatIDs?.forEach(chatId => {
      chats.find(chat => chat.id === chatId).read = true
    })
    unreadChatIDs = []
  }, [unreadChatIDs])

  useObserver({
    target: bottomRef,
    onIntersect: handleIntersect,
    dep: chats,
    root: document.querySelector(`.${cx('chats-wrapper')}`),
    threshold: 0.5,
  })

  function handleIntersect(entries) {
    if (entries[0].isIntersecting) {
      if (hasNextPage && !isFetchingNextPage) {
        setTimeout(() => {
          fetchNextPage()
        }, 500)
      }
    }
  }

  return (
    <>
      {!chatsLoading && chats?.length > 0 && (
        <div className={cx('chats-wrapper')}>
          <div className={cx('padding')} />
          {chats?.map(chat => (
            <div key={chat.id} className={cx('chat')}>
              <div
                className={cx('message-wrapper', {
                  my: chat.user.id === me?.id,
                })}>
                <div className={cx('message')}>{chat.message}</div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} className={cx('padding', 'bottom')} />
        </div>
      )}
      <WriteChat {...{ oppositeUser, onSubmitHandler }} />
    </>
  )
}
