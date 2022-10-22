import { useState, useEffect } from 'react'
import { useAccount } from '@root/src/client/hooks'
import { useMutation } from 'react-query'
import { changePasswordMutation } from '@client/shared/queries'

import classNames from 'classnames/bind'
import styles from '@components/pages/my/style/MyPage.module.css'
const cx = classNames.bind(styles)

export default function PasswordConfig() {
  const { me, refetchMe } = useAccount()
  const [formState, setFormState] = useState({
    id: me?.id,
    password: '',
    newPassword: '',
  })
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

  useEffect(() => {
    setFormState(prev => ({
      id: me?.id,
      password: prev.password,
      newPassword: prev.newPassword,
    }))
  }, [me])

  const { mutate } = useMutation(changePasswordMutation, {
    onSuccess: () => {
      alert('업데이트 완료')
      refetchMe()
      setFormState({
        id: me?.id,
        password: '',
        newPassword: '',
      })
      setNewPasswordConfirm('')
    },
    onError: () => {
      alert('업데이트 실패')
    },
  })

  function changeFormState(e) {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (formState.newPassword !== newPasswordConfirm) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    mutate(formState)
  }

  return (
    <div className={cx('config-body')}>
      <div className={cx('input-wrapper')}>
        <div className={cx('input-label')}>기존 비밀번호</div>
        <input type="password" name="password" value={formState.password} onChange={changeFormState} />
      </div>
      <div className={cx('input-wrapper')}>
        <div className={cx('input-label')}>새 비밀번호</div>
        <input type="password" name="newPassword" value={formState.newPassword} onChange={changeFormState} />
      </div>
      <div className={cx('input-wrapper')}>
        <div className={cx('input-label')}>새 비밀번호 재입력</div>
        <input type="password" value={newPasswordConfirm} onChange={e => setNewPasswordConfirm(e.target.value)} />
      </div>
      <button className={cx('button')} onClick={handleSubmit}>
        제출
      </button>
    </div>
  )
}
