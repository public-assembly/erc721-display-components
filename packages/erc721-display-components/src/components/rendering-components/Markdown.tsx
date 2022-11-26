import * as React from 'react'
import { useNFTProvider } from '../../context/NFTProvider'
import { addIPFSGateway } from '../../lib/addIPFSGateway'
import ReactMarkdown from 'react-markdown'

export interface MarkdownProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Markdown({...props}: MarkdownProps) {
  const { nftData } = useNFTProvider()
  
  const [tokenData, setTokenData] = React.useState<any>()

  React.useEffect(() => {
    const getMarkdown = async () => {
      if (nftData?.metadata?.contentUri)
        await fetch(addIPFSGateway(nftData?.metadata?.contentUri))
          .then((response) => response.text())
          .then((data) => setTokenData(data))
    }
    getMarkdown()
  }, [nftData?.metadata?.contentUri])

  return (
    <div className="nft-renderer__markdown-wrapper" {...props}>
      {tokenData && <ReactMarkdown>{tokenData}</ReactMarkdown>}
    </div>
  )
}