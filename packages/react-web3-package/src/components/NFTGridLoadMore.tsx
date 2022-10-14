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
    if (showObserver && handleLoadMore) handleLoadMore()
  }, [handleLoadMore, showObserver])

  return (
    <div className={`relative mb-4 w-full ${isValidating && 'validating'}`}>
      {!isValidating && <LoadMoreObserver handleVisible={handleVisible} />}
      <div
        className="align-center flex h-4 w-full flex-row justify-center py-4"
        aria-hidden>
        {isValidating && (
          <>{loadingIndicator ? loadingIndicator : <span>...loading...</span>}</>
        )}
      </div>
    </div>
  )
}
