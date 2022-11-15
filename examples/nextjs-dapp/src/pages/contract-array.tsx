import dynamic from "next/dynamic"

const ContractsGrid = dynamic(() => import('./../components/test-components/ContractsGrid'), {
  ssr: false,
})

function Page() {
  return (
    <section className="flex flex-col gap-4">
      <ContractsGrid />
    </section>
  )
}

export default Page
