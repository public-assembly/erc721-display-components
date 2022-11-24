import React from 'react'
import {
  useToken,
  UseTokenProps,
  NFTProvider,
  NFTCard,
} from '@public-assembly/erc721-display-components'
import { RawDisplayer } from '../RawDisplayer'
import { addIPFSGateway } from '@/lib/addIPFSGateway'
import ReactMarkdown from 'react-markdown'

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
      if (data?.metadata?.contentUri)
        await fetch(addIPFSGateway(data?.metadata?.contentUri))
          .then((response) => response.text())
          .then((data) => setTokenData(data))
    }
    getMarkdown()
  }, [data?.metadata?.contentUri])

  return (
    <div {...props}>
      {data && (
        <div className="grid lg:grid-cols-5 gap-6 lg:sticky lg:top-0">
          <div className="lg:col-span-1 lg:sticky lg:top-0">
            <NFTProvider
              contractAddress={contractAddress}
              tokenId={tokenId}
              nftData={data}>
              <NFTCard />
            </NFTProvider>
          </div>
          <div
            className="lg:col-span-4 gap-6 flex flex-col rounded-xl border-[1px] p-4 max-w-[960px] markdown-renderer"
            style={{
              background: data?.metadata?.raw?.theme?.colors?.background,
              /* @ts-ignore */
              '--text-color': data?.metadata?.raw?.theme?.colors?.text,
            }}>
            {tokenData && <ReactMarkdown>{tokenData}</ReactMarkdown>}
            <RawDisplayer data={data?.metadata} />
          </div>
        </div>
      )}
    </div>
  )
}
