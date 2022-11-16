import * as React from 'react'
import { NFTProvider } from '../context'
import { NFTCard } from './NFTCard'
import { useTokensQuery } from '../hooks'
import { NFTGridLoadMore } from './NFTGridLoadMore'

export interface NFTGridProps extends React.HTMLAttributes<HTMLDivElement> {
  contractAddress?: string | string[]
  chainId?: '1' | '5'
  ownerAddress?: string
  pageSize?: number
  useIntersectionObserver?: boolean
  nftRenderer?: React.ReactNode
  loadingIndicator?: React.ReactNode | string
  loadMoreButtonCta?: React.ReactNode | string
}

export function NFTGrid({
  contractAddress,
  chainId = '1',
  ownerAddress,
  pageSize,
  useIntersectionObserver = false,
  nftRenderer = <NFTCard />,
  loadingIndicator = 'Loading',
  loadMoreButtonCta = 'Load More',
  ...props
}: NFTGridProps) {
  const { data, isReachingEnd, isLoadingMore, handleLoadMore } = useTokensQuery({
    contractAddress: contractAddress,
    ownerAddress: ownerAddress,
    pageSize: pageSize,
    chainId: chainId,
  })

  return (
    <div className="nft-grid__wrapper relative flex w-full flex-col gap-4">
      <div
        className="nft-grid__token-grid grid gap-3 md:grid-cols-2 md:gap-4 2xl:grid-cols-4"
        {...props}>
        {data &&
          data.map((nft) => (
            <NFTProvider
              key={`${nft?.nft?.contract.address}-${nft?.nft?.tokenId}`}
              contractAddress={nft?.nft?.contract.address}
              tokenId={nft?.nft?.tokenId}
              nftData={nft}>
              {nftRenderer}
            </NFTProvider>
          ))}
      </div>
      {useIntersectionObserver && !isReachingEnd && (
        <NFTGridLoadMore
          isLoading={isLoadingMore}
          loadingIndicator={loadingIndicator}
          handleLoadMore={handleLoadMore}
        />
      )}
      {!useIntersectionObserver && (
        <button className="nft-grid__button" onClick={handleLoadMore}>
          {!isLoadingMore ? <>{loadMoreButtonCta}</> : <>{loadingIndicator}</>}
        </button>
      )}
    </div>
  )
}
