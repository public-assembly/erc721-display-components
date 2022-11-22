import dynamic from 'next/dynamic'

const OwnerGrid = dynamic(() => import('./../components/test-components/OwnerGrid'), {
  ssr: false,
})

function Page() {
  return (
    <section className="flex flex-col gap-4">
      <OwnerGrid />
    </section>
  )
}

export default Page
