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
          <div className={cx('header')}>
            <ProgileImg src={user?.profileImg} size={60} />
            <div className={cx('username')}>{user?.name}</div>
          </div>
        </div>
      )}
    </>
  )
}
