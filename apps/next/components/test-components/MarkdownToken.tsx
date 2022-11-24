import React from 'react'
import { useToken, UseTokenProps, NFTProvider, NFTCard } from '@public-assembly/erc721-display-components'
import { RawDisplayer } from '../RawDisplayer'
import { addIPFSGateway } from '@/lib/addIPFSGateway'

export default function MarkdownToken({
  contractAddress,
  tokenId,
  zoraApiKey,
  chainId,
  ...props
}: UseTokenProps) {
  const { data, error } = useToken({
    contractAddress: contractAddress,
    tokenId: tokenId,
    chainId: chainId,
  })
  
  return (
    <div {...props}>
      {data &&
        <div className='grid lg:grid-cols-5 gap-6'>
          <div className="lg:col-span-1">
            <NFTProvider
              contractAddress={contractAddress}
              tokenId={tokenId}
              nftData={data}>
              <NFTCard />
            </NFTProvider>
          </div>
          <div className="lg:col-span-4">
            <div dangerouslySetInnerHTML={{__html: addIPFSGateway(data?.metadata?.contentUri)}}/>
            <RawDisplayer data={{ data, error }} />
          </div>
        </div>
      }
    </div>
  )
}
