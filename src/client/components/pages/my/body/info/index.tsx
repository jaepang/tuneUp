import ProgileImg from '@components/profileImg'

import { useState, useEffect } from 'react'
import { useAccount } from '@client/hooks'
import { useMutation } from 'react-query'
import { updateUserMutation } from '@client/shared/queries'

import classNames from 'classnames/bind'
import styles from '@components/pages/my/style/MyPage.module.css'
const cx = classNames.bind(styles)

export default function InfoConfig() {
  const { me, refetchMe } = useAccount()
  const [formState, setFormState] = useState({
    id: me?.id,
    name: me?.name,
    profileImg: me?.profileImg,
    school: me?.school,
    email: me?.email,
    desc: me?.desc,
  })

  useEffect(() => {
    setFormState({
      id: me?.id,
      name: me?.name,
      profileImg: me?.profileImg,
      school: me?.school,
      email: me?.email,
      desc: me?.desc,
    })
  }, [me])

  const { mutate } = useMutation(updateUserMutation, {
    onSuccess: () => {
      alert('업데이트 완료')
      refetchMe()
    },
    onError: () => {
      alert('업데이트 실패')
    },
  })

  function changeFormState(e) {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  return (
    <div className={cx('config-body')}>
      <ProgileImg src={me?.profileImg} size={60} />
      <div className={cx('input-wrapper')}>
        <div className={cx('input-label')}>동아리 명</div>
        <input type="text" name="name" value={formState.name} onChange={changeFormState} />
      </div>
      <div className={cx('input-wrapper')}>
        <div className={cx('input-label')}>학교</div>
        <input type="text" name="school" value={formState.school} onChange={changeFormState} />
      </div>
      <div className={cx('input-wrapper')}>
        <div className={cx('input-label')}>소개</div>
        <textarea name="desc" value={formState.desc} onChange={changeFormState} rows={5} />
      </div>
      <div className={cx('input-wrapper')}>
        <div className={cx('input-label')}>이메일</div>
        <input type="email" name="email" value={formState.email} onChange={changeFormState} />
      </div>
      <button className={cx('button')} onClick={() => mutate(formState)}>
        제출
      </button>
    </div>
  )
}
