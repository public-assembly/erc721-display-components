import { useNFTProvider } from '@public-assembly/erc721-filter'
import { RawDisplayer } from './RawDisplayer'

export function NFTCard() {
  const { nft } = useNFTProvider()
  return (
    <div className="w-full flex flex-col gap-4 p-4 border-[1px] rounded-xl">
      <div className="relative aspect-square w-full">
        <img src={nft?.rawData?.token?.image?.mediaEncoding?.large} />
      </div>
      <RawDisplayer data={nft?.rawData?.token?.image?.mediaEncoding?.large} />
    </div>
  )
}