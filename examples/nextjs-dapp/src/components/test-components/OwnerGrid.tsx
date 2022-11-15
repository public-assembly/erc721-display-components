import { useAuth } from '../../hooks/useAuth'
import { NFTGrid, useNFTProvider } from '@public-assembly/erc721-filter'
import { RawDisplayer } from '../RawDisplayer'

function NFTCard() {
  const { nft } = useNFTProvider()
  return (
    <div className="w-full">
      <img src={nft?.rawData?.token?.image?.mediaEncoding?.large} />
      <RawDisplayer data={nft?.rawData?.token?.image?.mediaEncoding?.large} />
    </div>
  )
}

export default function OwnerGrid() {
  const { address, displayName, chain } = useAuth()

  return (
    <div className="flex flex-col relative">
      <div className="sticky top-4 z-50 pb-4">
        <h1 className="text-xl py-2 px-3" style={{backgroundColor: 'yellow'}}>{chain?.name} NFTs | {displayName}</h1>
      </div>
      <div className="relative z-10">
        {address &&
          <NFTGrid
            pageSize={8}
            ownerAddress={address}
            chainId={chain?.id.toString() as '1' | '5'}
            nftRenderer={<NFTCard />}
            loadMoreButtonCta="Click to load more NFTs"
          />
        }
      </div>
    </div>
  )
}
