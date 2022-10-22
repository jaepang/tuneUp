import InfoConfig from './info'
import PasswordConfig from './password'
import ShowRequestConfig from './request'

import { useRouter } from 'next/router'

import classNames from 'classnames/bind'
import styles from '@components/pages/my/style/MyPage.module.css'
const cx = classNames.bind(styles)

export default function MyPageBody() {
  const router = useRouter()
  const page = router.query.page as string

  return (
    <div className={cx('body')}>
      {page === 'info' && <InfoConfig />}
      {page === 'password' && <PasswordConfig />}
      {page === 'showrequest' && <ShowRequestConfig />}
    </div>
  )
}
