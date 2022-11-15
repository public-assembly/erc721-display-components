import { useAuth } from '../../hooks/useAuth'
import { NFTGrid, useNFTProvider } from '@public-assembly/erc721-filter'
import { RawDisplayer } from '../RawDisplayer'

function NFTCard() {
  const { nft } = useNFTProvider()
  return (
    <div className="w-full">
      <RawDisplayer data={nft?.nft} />
    </div>
  )
}

export default function OwnerGrid() {
  const { address, displayName } = useAuth()
  return (
    <div className="flex flex-col">
      <h1>{displayName}</h1>
      {address &&
        <NFTGrid
          ownerAddress={address}
          nftRenderer={<NFTCard />}
        />
      }
    </div>
  )
}
