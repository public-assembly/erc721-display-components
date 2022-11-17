import * as React from 'react'
import { useNFTProvider } from '../../context/NFTProvider'
import { placeHolderImage } from '../../lib'
import { useInView } from 'react-intersection-observer'

interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * transitionSpeed: fade in of image in Milliseconds.
   * @default: undefined
   */
  transitionSpeed?: number
}

export default function Image({ transitionSpeed = 150, ...props }: ImageProps) {
  const { nftData } = useNFTProvider()

  const [loaded, setLoaded] = React.useState(false)

  const loadedHandler = React.useCallback((e: any) => {
    if (e.target.src !== placeHolderImage) setLoaded(true)
  }, [])

  /*
  const aspectRatio = React.useMemo(() => {
    return null
  }, [])
  */

  const { ref, inView } = useInView({
    threshold: 0,
  })

  return (
    <div className="nft-renderer__image-wrapper relative aspect-square w-full" {...props}>
      <img
        ref={ref}
        className={`
          nft-renderer__image absolute top-0 bottom-0 left-0 right-0 m-auto
          ${loaded ? 'nft-renderer__image-loaded' : 'nft-renderer__image-loading'}
        `}
        src={
          inView ? nftData?.rawData?.token?.image?.mediaEncoding?.large : placeHolderImage
        }
        onLoad={loadedHandler}
        style={{
          opacity: loaded ? 1 : 0,
          transition: `opacity ${transitionSpeed}ms ease-in`,
        }}
      />
    </div>
  )
}
