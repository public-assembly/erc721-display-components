import React from 'react'
import { useNFTProvider } from '../../context'
import { addIPFSGateway } from './../../lib'

export interface AudioProps extends React.AudioHTMLAttributes<HTMLElement> {}

const Audio = React.forwardRef<HTMLAudioElement, AudioProps>(
  (props, ref) => {
    const { nftData } = useNFTProvider()

    const src = React.useMemo(
      () =>
        nftData?.metadata?.contentUri
          ? addIPFSGateway(nftData?.metadata?.contentUri)
          : nftData?.content?.large?.uri,
      [nftData]
    )

    return <audio ref={ref} className="nft-renderer__audio" {...props} controls src={src} />
  }
)

export default Audio
