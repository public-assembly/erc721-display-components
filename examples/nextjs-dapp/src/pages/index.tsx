import dynamic from "next/dynamic"

const OwnderGrid = dynamic(() => import('./../components/test-components/OwnerGrid'), {
  ssr: false,
})

function Page() {
  return (
    <section className="flex flex-col gap-4">
      <OwnderGrid />
    </section>
  )
}

export default Page
