import React from 'react'
import { NFTGrid } from '@public-assembly/erc721-display-components'
import { useAuth } from '../../hooks/useAuth'
import { RawDisplayer } from '../RawDisplayer'

const GOERLI_CONTRACTS = [
  '0x0fca820f55cb0c41bbf69273f903c7292a581c6e',
  '0xd38a7c591e99322ba82977c501905b75f9f5580e',
]

const MAINNET_CONTRACTS = [
  '0x5bbc122e437a0f418b64454de76a431658c5162b',
  '0xfd05b04a0040325c0d975b89f6f3aeb188fb1fbd',
]

export default function OwnerGrid() {
  const { chain } = useAuth()

  const contracts = React.useMemo(
    () => (chain?.id === 1 ? MAINNET_CONTRACTS : GOERLI_CONTRACTS),
    [chain]
  )

  return (
    <div className="flex flex-col relative">
      {chain ? (
        <>
          <div className="sticky top-4 z-50 pb-4">
            <RawDisplayer data={{ contracts }} />
          </div>
          <div className="relative z-10">
            <NFTGrid
              pageSize={8}
              contractAddress={contracts}
              chainId={chain?.id.toString() as '1' | '5'}
              useIntersectionObserver
            />
          </div>
        </>
      ) : (
        <h1 className="text-xl py-2 px-3" style={{ backgroundColor: 'yellow' }}>
          Connect to view your nfts
        </h1>
      )}
    </div>
  )
}
