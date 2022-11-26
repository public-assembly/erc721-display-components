import dynamic from 'next/dynamic'

const AudioToken = dynamic(
  () => import('./../components/test-components/AudioToken'),
  {
    ssr: false,
  }
)

function Page() {
  return (
    <section className="flex flex-col gap-4">
      <AudioToken
        contractAddress="0x5bbc122e437a0f418b64454de76a431658c5162b"
        tokenId="1"
      />
    </section>
  )
}

export default Page
