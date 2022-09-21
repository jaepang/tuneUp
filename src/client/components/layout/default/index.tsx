import NavBar from '@components/layout/shared/navbar'
import classNames from 'classnames/bind'
import styles from '@styles/components/layout/default/Layout.module.css'
const cx = classNames.bind(styles)

export default function Layout({ children }) {
  return (
    <div className={cx('layout')}>
      <NavBar />
      <div className={cx('content-wrapper')}>{children}</div>
    </div>
  )
}
