import * as React from 'react'
import { useInView } from 'react-intersection-observer'

interface NFTGridLoadMoreProps {
  isLoading?: boolean
  loadingIndicator?: React.ReactNode | string
  handleLoadMore?: () => void
}

export const NFTGridLoadMore = ({
  isLoading,
  loadingIndicator,
  handleLoadMore,
}: NFTGridLoadMoreProps) => {
  const [ref, inView] = useInView({
    threshold: 0.25,
    rootMargin: '0px 0px 500px 0px',
  })

  React.useEffect(() => {
    if (inView) handleLoadMore()
  }, [inView])

  return (
    <div
      className={`nft-grid__load-more relative mb-[20px] w-full ${
        isLoading && 'validating'
      }`}>
      {!isLoading && (
        <div
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 20,
            width: '100%',
          }}
          className="nft-grid__loadmore-observer"
          ref={ref}
          aria-hidden
        />
      )}
      <div
        className="align-center flex h-[20px] w-full flex-row justify-center py-4"
        aria-hidden>
        {isLoading && <>{loadingIndicator ? loadingIndicator : <span>Loading</span>}</>}
      </div>
    </div>
  )
}
