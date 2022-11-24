import React from 'react'
import {
  useToken,
  UseTokenProps,
  NFTProvider,
  NFTCard,
} from '@public-assembly/erc721-display-components'
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

  const [tokenData, setTokenData] = React.useState<any>()

  React.useEffect(() => {
    const getMarkdown = async () => {
      await fetch(addIPFSGateway(data?.metadata?.contentUri))
        .then((response) => response.text())
        .then((data) => setTokenData(data))
    }
    getMarkdown()
  }, [data?.metadata?.contentUri])

  return (
    <div {...props}>
      {data && (
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-1">
            <NFTProvider
              contractAddress={contractAddress}
              tokenId={tokenId}
              nftData={data}>
              <NFTCard />
            </NFTProvider>
          </div>
          <div className="lg:col-span-4 gap-6 flex flex-col">
            <div dangerouslySetInnerHTML={{ __html: tokenData }} />
            <RawDisplayer data={{ data, error }} />
          </div>
        </div>
      )}
    </div>
  )
}
