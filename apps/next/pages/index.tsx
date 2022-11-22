import dynamic from 'next/dynamic'
import { Seo } from '@/components/Seo'

const OwnerGrid = dynamic(() => import('./../components/test-components/OwnerGrid'), {
  ssr: false,
})

function Page() {
  return (
    <section className="flex flex-col gap-4">
      <Seo />
      <OwnerGrid />
    </section>
  )
}

export default Page
