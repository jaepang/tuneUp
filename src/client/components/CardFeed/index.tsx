import Card from '@components/Card'

import classNames from 'classnames/bind'
import styles from '@components/Card/style/Card.module.css'
const cx = classNames.bind(styles)

export default function CardFeed({ data }) {
  return (
    <div className={cx('root')}>
      {data?.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  )
}
