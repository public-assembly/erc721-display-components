import * as React from 'react'
import { NFTProvider } from '../context'
import { useTokensQuery } from '../hooks'
import NFTCard from './NFTCard'
import {
  SortDirection,
  TokenSortKey,
  TokenSortInput
} from '@zoralabs/zdk/dist/queries/queries-sdk'
import NFTGridLoadMore from './NFTGridLoadMore'
import { ImageProps } from './rendering-components/Image'

/**
 * TODO: allow user to set grid cols easily via props.
 * 
  export type NFTGridColumns = {
    colsSM?: string
    colsMD?: string
    colsLG?: string
    colsXL?: string
    colsXXL?: string
  }
 * 
 */

const sortNewest = {
  sortDirection: SortDirection.Desc,
  sortKey: TokenSortKey.None,
  sortAxis: null,
} as TokenSortInput

const sortOldest = {
  sortDirection: SortDirection.Asc,
  sortKey: TokenSortKey.None,
  sortAxis: null,
} as TokenSortInput

export interface NFTGridProps extends React.HTMLAttributes<HTMLDivElement> {
  contractAddress?: string | string[]
  chainId?: '1' | '5'
  ownerAddress?: string
  pageSize?: number
  useIntersectionObserver?: boolean
  nftRenderer?: React.ReactNode
  loadingIndicator?: React.ReactNode | string
  loadMoreButtonCta?: React.ReactNode | string
  sortDirection?: 'Newest' | 'Oldest'
}

export default function NFTGrid({
  contractAddress,
  chainId = '1',
  ownerAddress,
  pageSize,
  useIntersectionObserver = false,
  nftRenderer,
  loadingIndicator = 'Loading',
  loadMoreButtonCta = 'Load More',
  /*
  colsSM,
  colsMD,
  colsLG,
  colsXL,
  colsXXL,
  */
  transitionSpeed = 150,
  useAspectRatio = false,
  imageLoadingIndicator = false,
  sortDirection = 'Newest',
  ...props
}: NFTGridProps & ImageProps) {
  const { data, isReachingEnd, isLoadingMore, handleLoadMore } = useTokensQuery({
    contractAddress: contractAddress,
    ownerAddress: ownerAddress,
    pageSize: pageSize,
    chainId: chainId,
    sort: sortDirection === 'Newest' ? sortNewest : sortOldest
  })

  return (
    <div className="nft-grid__wrapper relative flex w-full flex-col gap-4">
      <div
        className={`nft-grid__token-grid grid grid-cols-1 
        gap-4
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
      `}
        {...props}>
        {data &&
          data.map((nft) => (
            <NFTProvider
              key={`${nft?.nft?.contract.address}-${nft?.nft?.tokenId}`}
              contractAddress={nft?.nft?.contract.address}
              tokenId={nft?.nft?.tokenId}
              nftData={nft}>
              {nftRenderer ? (
                nftRenderer
              ) : (
                <NFTCard
                  transitionSpeed={transitionSpeed}
                  useAspectRatio={useAspectRatio}
                />
              )}
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
