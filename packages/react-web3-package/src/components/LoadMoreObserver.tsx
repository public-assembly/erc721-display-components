import * as React from 'react'
import { useInView } from 'react-intersection-observer'

type LoadMoreObserverProps = {
  handleVisible?: () => void
}

export function LoadMoreObserver({ handleVisible }: LoadMoreObserverProps) {
  const [ref, inView] = useInView({
    threshold: 0.25,
    rootMargin: '0px 0px 500px 0px',
  })

  React.useEffect(() => {
    if (inView && handleVisible) {
      handleVisible()
    }
  }, [inView, handleVisible])

  return (
    <div
      style={{ pointerEvents: 'none' }}
      className="nft-grid__loadmore-observer"
      ref={ref}
      aria-hidden
    />
  )
}
