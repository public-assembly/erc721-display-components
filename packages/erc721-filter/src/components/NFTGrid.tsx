import * as React from 'react'
import { NFTProvider } from '../context'
import { useTokensQuery } from '../hooks'
import NFTCard from './NFTCard'
import NFTGridLoadMore from './NFTGridLoadMore'

export interface NFTGridProps extends React.HTMLAttributes<HTMLDivElement> {
  contractAddress?: string | string[]
  chainId?: '1' | '5'
  ownerAddress?: string
  pageSize?: number
  useIntersectionObserver?: boolean
  nftRenderer?: React.ReactNode
  loadingIndicator?: React.ReactNode | string
  loadMoreButtonCta?: React.ReactNode | string
  colsSM?: string
  colsMD?: string
  colsLG?: string
  colsXL?: string
  colsXXL?: string
}

export default function NFTGrid({
  contractAddress,
  chainId = '1',
  ownerAddress,
  pageSize,
  useIntersectionObserver = false,
  nftRenderer = <NFTCard />,
  loadingIndicator = 'Loading',
  loadMoreButtonCta = 'Load More',
  colsSM = '1',
  colsMD = '2',
  colsLG = '2',
  colsXL = '3',
  colsXXL = '4',
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
        className={`
          nft-grid__token-grid grid gap-4
          grid-cols-${colsSM}
          md:grid-cols-${colsMD}
          lg:grid-cols-${colsLG}
          xl:grid-cols-${colsXL}
          2xl:grid-cols-${colsXXL}
        `}
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
