import { PATHNAME } from '@root/src/client/consts'
import { BsInfoCircle } from 'react-icons/bs'
import { VscKey } from 'react-icons/vsc'
import { GiTheaterCurtains } from 'react-icons/gi'

export const MYPAGE_LINKS = [
  {
    label: '동아리 정보',
    pageName: 'info',
    href: PATHNAME.MY_INFO,
    icon: BsInfoCircle,
  },
  {
    label: '비밀번호 변경',
    pageName: 'password',
    href: PATHNAME.MY_PASSWORD,
    icon: VscKey,
  },
  {
    label: '연합공연 정보',
    pageName: 'showrequests',
    href: PATHNAME.MY_SHOWREQUESTS,
    icon: GiTheaterCurtains,
  },
]
