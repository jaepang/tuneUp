import Layout from '@components/layout/default'
import Row from '@components/layout/shared/row'
import MainBanner from '@components/MainBanner'

import { useAccount } from '@client/hooks'

export default function HomePageComponent() {
  const { isLoggedIn } = useAccount()

  return (
    <Layout>
      <Row>
        {!isLoggedIn && <MainBanner />}
        <h1>지금 공연하고 싶은 동아리</h1>
      </Row>
    </Layout>
  )
}
