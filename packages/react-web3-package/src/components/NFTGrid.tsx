/* @ts-ignore */
import * as React from 'react'
import { NFTProvider } from '../context'
import { useTokensQuery } from '../hooks'
import { NFTGridLoadMore } from './NFTGridLoadMore'

export interface NFTGridProps {
  contractAddress?: string
  ownerAddress?: string
  chainId?: '1' | '5'
  pageSize?: number
  useIntersectionObserver?: boolean
  nftRenderer: React.ReactNode
  loadingIndicator?: React.ReactNode | string
  loadMoreButtonCta?: React.ReactNode | string
}

export function NFTGrid({
  contractAddress,
  ownerAddress,
  chainId = '1',
  pageSize = 15,
  useIntersectionObserver = false,
  nftRenderer,
  loadingIndicator = 'Loading',
  loadMoreButtonCta = 'Load More',
}: NFTGridProps) {
  const { data, isReachingEnd, isValidating, handleLoadMore } = useTokensQuery({
    contractAddress: contractAddress,
    ownerAddress: ownerAddress,
    pageSize: pageSize,
    chainId: chainId,
  })

  return (
    <div className="nft-grid__wrapper relative flex w-full flex-col gap-6">
      <div className="nft-grid__token-grid grid gap-3 md:grid-cols-2 md:gap-6">
        {data &&
          data.map((nft) => (
            <NFTProvider
              key={`${nft?.nft?.contract.address}-${nft?.nft?.tokenId}`}
              contractAddress={nft?.nft?.contract.address}
              tokenId={nft?.nft?.tokenId}
              nft={nft}>
              {nftRenderer}
            </NFTProvider>
          ))}
      </div>
      {useIntersectionObserver && !isReachingEnd && (
        <NFTGridLoadMore
          isValidating={isValidating}
          loadingIndicator={loadingIndicator}
          handleLoadMore={handleLoadMore}
        />
      )}
      {!useIntersectionObserver && (
        <button className="nft-grid__button" onClick={handleLoadMore}>
          {!isValidating ? <>{loadMoreButtonCta}</> : <>{loadingIndicator}</>}
        </button>
      )}
    </div>
  )
}
