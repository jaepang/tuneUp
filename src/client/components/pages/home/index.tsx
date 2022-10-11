import Layout from '@components/layout/default'
import Row from '@components/layout/shared/row'
import MainBanner from '@components/MainBanner'
import CardFeed from '@components/CardFeed'

import { useAccount } from '@client/hooks'
import { useQuery } from 'react-query'
import { requestsQuery } from '@client/shared/queries'

export default function HomePageComponent() {
  const { isLoggedIn } = useAccount()
  const { data, isLoading } = useQuery(['homeFeed'], () => requestsQuery({ skip: 0, take: 10 }))
  console.log(data)

  return (
    <Layout>
      <Row>
        {!isLoggedIn && <MainBanner />}
        <h1>지금 공연하고 싶은 동아리</h1>
        {!isLoading && <CardFeed {...{ data: data?.requestFeed }} />}
      </Row>
    </Layout>
  )
}
