import { useAuth } from '../../hooks/useAuth'
import { NFTGrid } from '@public-assembly/erc721-display-components'

export default function OwnerGrid() {
  const { address, displayName, chain } = useAuth()
  return (
    <div className="flex flex-col relative">
      {address ? (
        <>
          <div className="sticky top-4 z-50 pb-4">
            <h1 className="text-xl py-2 px-3" style={{ backgroundColor: 'yellow' }}>
              {chain?.name} NFTs | {displayName}
            </h1>
          </div>
          <div className="relative z-10">
            <NFTGrid
              pageSize={8}
              ownerAddress={address}
              chainId={chain?.id.toString() as '1' | '5'}
              loadMoreButtonCta="Click to load more NFTs"
            />
          </div>
        </>
      ) : (
        <h1 className="text-xl py-2 px-3" style={{ backgroundColor: 'yellow' }}>
          Connect to view your nfts
        </h1>
      )}
    </div>
  )
}
