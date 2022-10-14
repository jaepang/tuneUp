import Link from 'next/link'
import WriteChat from './writeChat'
import { BsChevronLeft } from 'react-icons/bs'

import { useRef } from 'react'
import { useAccount, useObserver, useReactQuerySubscription } from '@client/hooks'
import { useInfiniteQuery } from 'react-query'
import { chatsQuery } from '@client/shared/queries'

import classNames from 'classnames/bind'
import styles from '@components/pages/chat/style/Chat.module.css'
const cx = classNames.bind(styles)

const PAGE_SIZE = 10

export default function ChatRoom({ chatRoom, isMobile = false }) {
  const { me } = useAccount()
  const chatRoomId = chatRoom?.id
  const oppositeUser = chatRoom?.users?.find(user => user.id !== me?.id)
  const { onSubmitHandler } = useReactQuerySubscription(chatRoomId)
  const bottomRef = useRef<HTMLDivElement>(null)

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

  useObserver({
    target: bottomRef,
    onIntersect: handleIntersect,
    dep: chats,
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
    <div className={cx('chat-room')}>
      <div className={cx('header')}>
        {isMobile && (
          <Link href="/chat/">
            <button className={cx('back-button')}>
              <BsChevronLeft size={20} />
            </button>
          </Link>
        )}
        <div className={cx('profile-img-wrapper')}>
          <img className={cx('profile-img')} src={oppositeUser?.profileImg} />
        </div>
        <div className={cx('username')}>{oppositeUser?.name}</div>
      </div>
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
    </div>
  )
}
