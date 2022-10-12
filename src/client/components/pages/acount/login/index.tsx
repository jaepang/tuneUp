import { useRouter } from 'next/router'
import Row from '@components/layout/shared/row'
import { Input } from '@components/form'
import { useMutation } from 'react-query'
import { useState } from 'react'
import { useAccount } from '@client/hooks'
import { InputChangeParams } from '@shared/types'
import { loginMutation } from '@client/shared/queries'
import { PATHNAME, REG_EXP } from '@root/src/client/consts'
import Link from 'next/link'

import classNames from 'classnames/bind'
import styles from '@components/pages/acount/style/Account.module.css'
const cx = classNames.bind(styles)

export default function LoginPageComponent() {
  const router = useRouter()
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })
  const [formErrorState, setFormErrorState] = useState({
    email: undefined,
    password: undefined,
  })
  const { isLoggedIn, login } = useAccount({
    isUnauthRequired: true,
    unauthRequiredRedirectUrl: getRedirectUrl(),
  })

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(loginMutation, {
    onSuccess: (data, _variables, _context) => {
      const {
        login: { token },
      } = data
      login(token)
    },
    onError: (_error, _variables, _context) => {
      alert('로그인에 실패하였습니다.')
    },
  })

  function getRedirectUrl(): string {
    if (router.query && router.query.redirect) {
      return router.query.redirect as string
    } else {
      return PATHNAME.HOME
    }
  }

  function handleInputChange({ name, value }: InputChangeParams) {
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (isLoading) return

    if (getIsFormValid()) {
      mutate({
        ...formState,
      })
    }
  }

  function getIsFormValid() {
    let isValid = true
    const curFormErrorState = {
      email: undefined,
      password: undefined,
    }

    if (!REG_EXP.email.test(formState.email)) {
      curFormErrorState.email = '올바른 이메일 주소를 입력해주세요.'
      isValid = false
    }

    /*if (formState.password.length < 8) {
      curFormErrorState.password = '비밀번호는 8자 이상이어야 합니다.'
      isValid = false
    }*/

    setFormErrorState({
      ...curFormErrorState,
    })

    return isValid
  }

  return (
    <Row>
      <div className={cx('root')}>
        <div className={cx('container')}>
          <div className={cx('header-title')}>
            <h1>로그인</h1>
          </div>
          <form className={cx('login-form')} name="login">
            <div className={cx('input-wrapper')}>
              <label>아이디(이메일)</label>
              <Input
                value={formState.email}
                name="email"
                onChange={handleInputChange}
                placeholder="이메일 주소를 입력해주세요"
                disabled={isLoading}
                errorMsg={formErrorState.email}
              />
            </div>
            <div className={cx('input-wrapper')}>
              <label>비밀번호</label>
              <Input
                type="password"
                value={formState.password}
                name="password"
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="영문/숫자/특수문자 중 2가지 이상 포함, 총 8자 이상"
                errorMsg={formErrorState.password}
              />
            </div>
            <div className={cx('misc-container')}>
              <Link href={PATHNAME.SIGNUP}>
                <a>회원가입</a>
              </Link>
            </div>
            <div className={cx('buttons-container')}>
              <button className={cx('button', 'login')} type="submit" onClick={handleSubmit} disabled={isLoading}>
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </Row>
  )
}
