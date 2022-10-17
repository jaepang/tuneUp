import CardFeed from '@root/src/client/components/cardFeed'

import { useQuery } from 'react-query'
import { userInfoQuery } from '@client/shared/queries'
import ProgileImg from '@components/profileImg'

import classNames from 'classnames/bind'
import styles from '@components/pages/chat/style/Chat.module.css'
const cx = classNames.bind(styles)

export default function OpositeUserInfo({ oppositeUserId }) {
  const { data, isLoading } = useQuery(['userInfo', { userId: oppositeUserId }], userInfoQuery, {
    enabled: !!oppositeUserId,
  })
  const { userInfo: user } = data ?? {}
  console.log(user)

  return (
    <>
      {!isLoading && (
        <div className={cx('opposite-user-info')}>
          <div className={cx('title')}>
            <ProgileImg src={user?.profileImg} size={60} />
            <h1 className={cx('username')}>{user?.name}</h1>
          </div>
          <div className={cx('basic-info')}>
            {user?.school && <div className={cx('school')}>{user?.school}</div>}
            {user?.email && <div className={cx('email')}>{user?.email}</div>}
          </div>
          <div className={cx('body')}>
            <div className={cx('description')}>{user?.desc}</div>
            {user?.requests && <CardFeed data={user?.requests} />}
          </div>
        </div>
      )}
    </>
  )
}
