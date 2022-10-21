import Layout from '@components/layout/default'
import Row from '@components/layout/shared/row'
import { ROW_TYPE } from '@components/layout/shared/row'
import ChatRoomsComponent from '@components/pages/chat'
import MyPageComponent from '@components/pages/my'

export default function ChatRoomsPage() {
  return (
    <Layout shouldHideNavBarOnMobile>
      <Row type={ROW_TYPE.FULL_SCREEN}>
        <MyPageComponent />
      </Row>
    </Layout>
  )
}
