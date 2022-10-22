import Row from '@components/layout/shared/row'
import MainBanner from '@root/src/client/components/mainBanner'
import CardFeed from '@root/src/client/components/cardFeed'

import { useRef } from 'react'
import { useWindowSize, useObserver } from '@client/hooks'
import { useInfiniteQuery } from 'react-query'
import { requestFeedQuery } from '@client/shared/queries'

const PAGE_SIZE = 10
export default function HomePageComponent() {
  const bottomRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const isTablet = width <= 1024

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery(
    'requestFeed',
    ({ pageParam = 0 }) => requestFeedQuery({ skip: pageParam === 0 ? 0 : 1, take: PAGE_SIZE, cursorId: pageParam }),
    {
      getNextPageParam: lastPage => {
        if (lastPage.requestFeed.length < PAGE_SIZE) return undefined
        return lastPage.requestFeed[lastPage.requestFeed.length - 1].id
      },
    },
  )
  const { pages } = data ?? {}
  const requests = pages?.reduce((acc, page) => [...acc, ...page.requestFeed], [])

  useObserver({
    target: bottomRef,
    onIntersect: handleIntersect,
    dep: requests,
  })

  function handleIntersect(entries) {
    if (entries[0].isIntersecting) {
      if (hasNextPage && !isFetchingNextPage) {
        setTimeout(() => {
          fetchNextPage()
        }, 500)
      }
    }
  }

  const rowStyle = {
    marginTop: isTablet ? '84px' : '130px',
  }

  return (
    <Row style={rowStyle}>
      <MainBanner />
      <h1>지금 공연하고 싶은 동아리</h1>
      {!isLoading && <CardFeed {...{ data: requests }} />}
      <div ref={bottomRef} />
    </Row>
  )
}
