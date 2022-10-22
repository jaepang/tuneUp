import ReactDatePicker from 'react-datepicker'
import { kdayjs } from '@shared/utils'
import { ko } from 'date-fns/locale'

import { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
import {
  myPageRequestQuery,
  createOrUpdateShowRequestMutation,
  deleteShowRequestMutation,
} from '@client/shared/queries'

import classNames from 'classnames/bind'
import styles from '@components/pages/my/style/MyPage.module.css'
const cx = classNames.bind(styles)

export default function ShowRequestConfig() {
  const { data, refetch } = useQuery('myPageRequest', myPageRequestQuery)
  const request = data?.myPageRequest

  const [formState, setFormState] = useState({
    id: request?.id,
    available: request?.available ?? false,
    date: kdayjs(request?.date).toDate() ?? kdayjs().toDate(),
    place: request?.place ?? '',
    budget: request?.budget ?? 0,
    desc: request?.desc ?? '',
  })
  useEffect(() => {
    setFormState({
      id: request?.id,
      available: request?.available ?? false,
      date: kdayjs(request?.date).toDate() ?? kdayjs().toDate(),
      place: request?.place ?? '',
      budget: request?.budget ?? 0,
      desc: request?.desc ?? '',
    })
  }, [request])

  const { mutate: createOrUpdateShowRequest } = useMutation(createOrUpdateShowRequestMutation, {
    onSuccess: () => {
      alert('업데이트 완료')
      refetch()
    },
    onError: () => {
      alert('업데이트 실패')
    },
  })

  const { mutate: deleteShowRequest } = useMutation(deleteShowRequestMutation, {
    onSuccess: () => {
      alert('삭제 완료')
      refetch()
    },
    onError: () => {
      alert('삭제 실패')
    },
  })

  function changeFormState(e) {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  function handleUpdate() {
    const variables = {
      ...formState,
      id: formState.id ?? undefined,
      budget: Number(formState.budget),
    }
    createOrUpdateShowRequest(variables)
  }

  function handleDelete() {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteShowRequest({ id: formState.id })
    }
  }

  return (
    <div className={cx('config-body')}>
      <div className={cx('header')}>
        <h1>연합공연 정보 수정</h1>
      </div>
      <div className={cx('input-wrapper')}>
        <div className={cx('input-label')}>노출</div>
        <input
          className={cx('available')}
          type="checkbox"
          checked={formState.available}
          onChange={e => setFormState({ ...formState, available: e.target.checked })}
        />
      </div>
      <div className={cx('input-wrapper')}>
        <div className={cx('input-label')}>희망 공연 날짜</div>
        <ReactDatePicker
          selected={formState.date}
          dateFormat="yyyy-MM-dd (eee)"
          onChange={date => setFormState({ ...formState, date })}
          locale={ko}
          minDate={new Date()}
        />
      </div>
      <div className={cx('input-wrapper')}>
        <div className={cx('input-label')}>공연 장소</div>
        <input type="text" name="place" value={formState.place} onChange={changeFormState} />
      </div>
      <div className={cx('input-wrapper')}>
        <div className={cx('input-label')}>예산 (만원)</div>
        <input type="number" name="budget" value={formState.budget} onChange={changeFormState} />
      </div>
      <div className={cx('input-wrapper')}>
        <div className={cx('input-label')}>소개</div>
        <textarea name="desc" value={formState.desc} onChange={changeFormState} rows={5} />
      </div>
      <div className={cx('footer')}>
        <button className={cx('button', 'blue')} onClick={() => handleUpdate()}>
          적용
        </button>
        <button className={cx('button', 'red')} onClick={() => handleDelete()}>
          삭제
        </button>
      </div>
    </div>
  )
}
