import React from 'react'
import {
  useToken,
  UseTokenProps,
  NFTProvider,
  NFTCard,
  Renderer,
} from '@public-assembly/erc721-display-components'
import { RawDisplayer } from '../RawDisplayer'

export default function MarkdownToken({
  contractAddress,
  tokenId,
  zoraApiKey,
  chainId,
  ...props
}: UseTokenProps) {
  const { data } = useToken({
    contractAddress: contractAddress,
    tokenId: tokenId,
    chainId: chainId,
  })

  if (!data) return null

  return (
    <div {...props}>
      <NFTProvider contractAddress={contractAddress} tokenId={tokenId} nftData={data}>
        <div className="grid lg:grid-cols-5 gap-6 lg:sticky lg:top-0">
          <div className="lg:col-span-1 lg:sticky lg:top-0">
            <NFTCard />
          </div>
          <div
            className="lg:col-span-4 gap-6 flex flex-col rounded-xl border-[1px] p-4 max-w-[960px]"
            style={{
              background: data?.metadata?.raw?.theme?.colors?.background,
              /* @ts-ignore */
              '--text-color': data?.metadata?.raw?.theme?.colors?.text,
            }}>
            <Renderer.Markdown />
          </div>
        </div>
      </NFTProvider>
    </div>
  )
}
