import * as React from 'react'
import { useNFTProvider } from './../context/NFTProvider'

export interface NFTCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function NFTCard({ ...props }: NFTCardProps) {
  const { nftData } = useNFTProvider()

  return (
    <div
      className="nft-card__wrapper flex w-full flex-col gap-4 rounded-xl border-[1px] p-4"
      {...props}>
      <div className="nft-card__image-wrapper relative aspect-square w-full">
        <img
          className="absolute top-0 bottom-0 left-0 right-0 m-auto"
          src={nftData?.rawData?.token?.image?.mediaEncoding?.large}
        />
      </div>
      <hr className="nft-card__separator" />
      <div className="nft-card__info-wrapper relative flex w-full flex-col">
        <h4 className="nft-card__title">{nftData?.metadata?.name}</h4>
        <h3 className="nft-card__contract-info">
          {nftData?.nft?.contract?.name} {nftData?.nft?.tokenId}
        </h3>
      </div>
    </div>
  )
}
