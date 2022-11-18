import * as React from 'react'
import { useNFTProvider } from '../../context/NFTProvider'
import { placeHolderImage } from '../../lib'
import { useInView } from 'react-intersection-observer'

export interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * transitionSpeed: fade in of image in Milliseconds.
   * @default: undefined
   */
  transitionSpeed?: number
  useAspectRatio?: boolean
  imageLoadingIndicator?: string | React.ReactNode | boolean
}

export default function Image({
  transitionSpeed = 150,
  useAspectRatio = false,
  imageLoadingIndicator = false,
  ...props
}: ImageProps) {
  const { nftData } = useNFTProvider()

  const [loaded, setLoaded] = React.useState(false)

  const loadedHandler = React.useCallback((e: any) => {
    if (e.target.src !== placeHolderImage) setLoaded(true)
  }, [])

  const { ref, inView } = useInView({
    threshold: 0,
  })

  const imageRef = React.useRef<HTMLImageElement>(null)

  const aspectRatio = React.useMemo(() => {
    if (loaded && inView) {
      return `${imageRef?.current?.naturalWidth} / ${imageRef?.current?.naturalWidth}`
    } else {
      return '1 / 1'
    }
  }, [inView, loaded, imageRef])

  return (
    <div
      ref={ref}
      className="nft-renderer__image-wrapper relative w-full"
      {...props}
      style={{
        aspectRatio: useAspectRatio ? aspectRatio : '1 / 1',
      }}>
      <img
        ref={imageRef}
        className={`
          nft-renderer__image absolute top-0 bottom-0 left-0 right-0 z-10 m-auto h-full w-full
          ${loaded ? 'nft-renderer__image-loaded' : 'nft-renderer__image-loading'}
          ${useAspectRatio ? 'object-fill' : 'object-contain'}
        `}
        src={
          inView ? nftData?.rawData?.token?.image?.mediaEncoding?.large : placeHolderImage
        }
        onLoad={loadedHandler}
        alt={`${nftData?.nft?.contract?.name} - ${nftData?.metadata?.name}`}
        style={{
          opacity: loaded ? 1 : 0,
          transition: `opacity ${transitionSpeed}ms ease-in`,
        }}
      />
      {imageLoadingIndicator && (
        <div
          className={`nft-renderer__image--loading-indicator pointer-events-none absolute inset-0 z-0 flex justify-center align-middle`}>
          <div className="text-[20px]">⟳</div>
        </div>
      )}
    </div>
  )
}
