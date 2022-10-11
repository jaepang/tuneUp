import Card from './Card'

import classNames from 'classnames/bind'
import styles from './style/CardFeed.module.css'
const cx = classNames.bind(styles)

export default function CardFeed({ data }) {
  return (
    <div className={cx('feed')}>
      {data?.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  )
}
