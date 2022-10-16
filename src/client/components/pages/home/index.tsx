import Row from '@components/layout/shared/row'
import MainBanner from '@components/MainBanner'
import CardFeed from '@components/CardFeed'

import { useAccount } from '@client/hooks'
import { useWindowSize } from '@client/hooks'
import { useQuery } from 'react-query'
import { requestsQuery } from '@client/shared/queries'

export default function HomePageComponent() {
  const { isLoggedIn, isMeLoading } = useAccount()
  const { data, isLoading } = useQuery(['homeFeed'], () => requestsQuery({ skip: 0, take: 10 }))
  const { width } = useWindowSize()
  const isTablet = width <= 1024
  console.log('isMeLoading', isMeLoading)
  console.log('isLoggedIn', isLoggedIn)

  const rowStyle = {
    marginTop: isTablet ? '84px' : '130px',
  }

  return (
    <Row style={rowStyle}>
      <MainBanner />
      <h1>지금 공연하고 싶은 동아리</h1>
      {!isLoading && <CardFeed {...{ data: data?.requestFeed }} />}
    </Row>
  )
}
