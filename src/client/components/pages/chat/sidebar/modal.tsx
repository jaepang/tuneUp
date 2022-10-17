import { useState } from 'react'
import { useRouter } from 'next/router'
import { queryClient } from '@client/shared/react-query'
import { useQuery, useMutation } from 'react-query'
import { usersBySearchParamQuery, createChatRoomMutation } from '@client/shared/queries'

import classNames from 'classnames/bind'
import styles from '@components/pages/chat/style/Chat.module.css'
const cx = classNames.bind(styles)

export default function ExploreModal() {
  const router = useRouter()
  const [searchParam, setSearchParam] = useState('')

  const { data, isLoading, refetch } = useQuery(['usersBySearchParam'], () => usersBySearchParamQuery({ searchParam }))
  const users = data?.usersBySearchParam

  const { mutate } = useMutation(createChatRoomMutation, {
    onSuccess: data => {
      const chatRoomId = data?.createChatRoom?.id
      queryClient.refetchQueries('chatRooms')
      router.push(`/chat/${chatRoomId}`)
    },
    onError: () => {
      console.log('채팅 생성에 실패했습니다.')
    },
  })

  function onSearchParamChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParam(e.target.value)
  }

  return (
    <div className={cx('modal')}>
      <div className={cx('header')}>
        <div className={cx('title')}>새로운 메시지</div>
        <div className={cx('search-bar')}>
          <input type="text" placeholder="검색..." value={searchParam} onChange={onSearchParamChange} />
          <button onClick={() => refetch()}>검색</button>
        </div>
        {!isLoading &&
          (users?.length === 0 ? (
            <div className={cx('no-result')}>검색 결과가 없습니다.</div>
          ) : (
            <div className={cx('users')}>
              {users?.map(user => (
                <div className={cx('user')} key={user.id} onClick={() => mutate({ toUserId: user.id })}>
                  <div className={cx('profile-img-wrapper')}>
                    <img className={cx('profile-img')} src={user.profileImg} />
                  </div>
                  <div className={cx('username')}>{user.name}</div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}
