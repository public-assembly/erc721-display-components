# ERC721 Filter

## Load addresses owned tokens:

```
import { useAccount } from 'wagmi'
import { NFTGrid, useNFTProvider } from '@public-assembly/erc721-filter'
import { RawDisplayer } from '../components'

function NFTCard() {
  const { nft } = useNFTProvider()
  return (
    <div className="w-full">
      <RawDisplayer data={nft?.nft} />
    </div>
  )
}

function Page() {
  const { address } = useAccount()

  return (
    <section className="flex flex-col gap-4">
      {address &&
        <NFTGrid
          ownerAddress={address}
          nftRenderer={<NFTCard />}
        />
      }
    </section>
  )
}

export default Page
```