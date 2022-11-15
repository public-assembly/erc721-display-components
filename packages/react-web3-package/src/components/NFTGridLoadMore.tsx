import * as React from 'react'
import { LoadMoreObserver } from './LoadMoreObserver'

interface NFTGridLoadMoreProps {
  showObserver?: boolean
  isValidating?: boolean
  handleLoadMore?: () => void
  loadingIndicator?: React.ReactNode
}

export const NFTGridLoadMore = ({
  showObserver,
  isValidating,
  handleLoadMore,
  loadingIndicator,
}: NFTGridLoadMoreProps) => {
  const handleVisible = React.useCallback(() => {
    handleLoadMore()
  }, [handleLoadMore, showObserver])

  return (
    <div
      className={`nft-grid__load-more relative mb-[20px] w-full ${
        isValidating && 'validating'
      }`}>
      {!isValidating && <LoadMoreObserver handleVisible={handleVisible} />}
      <div
        className="align-center flex h-[20px] w-full flex-row justify-center py-4"
        aria-hidden>
        {isValidating && (
          <>{loadingIndicator ? loadingIndicator : <span>Loading</span>}</>
        )}
      </div>
    </div>
  )
}
