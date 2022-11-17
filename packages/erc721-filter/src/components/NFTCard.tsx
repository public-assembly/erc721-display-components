import * as React from 'react'
import { useNFTProvider } from './../context/NFTProvider'

import { Image } from './rendering-components'

export interface NFTCardProps extends React.HTMLAttributes<HTMLDivElement> {
  showTokenInfo?: boolean
  showContractInfo?: boolean
  showTokenId?: boolean
  tokenIdPrefix?: string
}

export default function NFTCard({
  showTokenInfo = true,
  showContractInfo = true,
  showTokenId = true,
  tokenIdPrefix = '#',
  ...props
}: NFTCardProps) {
  const { nftData } = useNFTProvider()

  return (
    <div
      className="nft-card__wrapper flex w-full flex-col gap-4 rounded-xl border-[1px] p-4"
      {...props}>
      <Image className="nft-card__thumbnail-wrapper relative aspect-square w-full" />
      {showTokenInfo && (
        <div className="nft-card__token-info">
          <hr className="nft-card__separator" />
          <div className="nft-card__info-wrapper relative grid w-full">
            <div className="nft-card__title-wrapper w-full overflow-x-scroll">
              <h4 className="nft-card__title whitespace-nowrap">
                {nftData?.metadata?.name}
              </h4>
            </div>
            {showContractInfo && (
              <div className="nft-card__contract-info--wrapper w-full overflow-x-scroll">
                <h3 className="nft-card__contract-info flex flex-row">
                  <span className="nft-card__contract-info--contract-name whitespace-nowrap">
                    {nftData?.nft?.contract?.name}
                  </span>
                  <span className="nft-card__contract-info--spacer pre-token-id">
                    &nbsp;
                  </span>
                  {showTokenId && (
                    <>
                      <span className="nft-card__contract-info--token-id whitespace-nowrap">
                        {`${tokenIdPrefix}`}
                        {nftData?.nft?.tokenId}
                      </span>
                      <span className="nft-card__contract-info--spacer">&nbsp;</span>
                    </>
                  )}
                </h3>
              </div>
            )}
            <div>{}</div>
          </div>
        </div>
      )}
    </div>
  )
}
