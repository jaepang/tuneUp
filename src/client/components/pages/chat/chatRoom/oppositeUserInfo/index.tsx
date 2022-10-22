import { BsClock, BsMap, BsCashCoin } from 'react-icons/bs'

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
            {user?.request && user?.request.available ? (
              <div className={cx('request')}>
                <h2 className={cx('request-title')}>모집 중인 연합 공연</h2>
                <div className={cx('head')}>
                  <div className={cx('date')}>
                    <BsClock size={15} />
                    {user.request.date.slice(0, 10)}
                  </div>
                  <div className={cx('place')}>
                    <BsMap size={15} />
                    {user.request.place}
                  </div>
                  <div className={cx('budget')}>
                    <BsCashCoin size={15} />
                    예산: {user.request.budget}만원
                  </div>
                </div>
                <div className={cx('desc')}>{user.request.desc}</div>
              </div>
            ) : (
              <div className={cx('no-request')}>현재 모집 중인 연합 공연이 없습니다.</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
