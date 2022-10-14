import Layout from '@components/layout/default'
import Row from '@components/layout/shared/row'
import { ROW_TYPE } from '@components/layout/shared/row'
import ChatRoomsComponent from '@components/pages/chat'

export default function ChatRoomsPage() {
  return (
    <Layout>
      <Row type={ROW_TYPE.FULL_SCREEN}>
        <ChatRoomsComponent />
      </Row>
    </Layout>
  )
}
