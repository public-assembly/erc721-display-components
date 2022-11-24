import dynamic from 'next/dynamic'

const MarkdownToken = dynamic(
  () => import('./../components/test-components/MarkdownToken'),
  {
    ssr: false,
  }
)

function Page() {
  return (
    <section className="flex flex-col gap-4">
      <MarkdownToken contractAddress='0xDBE0725B255753D9258f42a235116B0Ab333E7E7' tokenId='1'/>
    </section>
  )
}

export default Page
