# @public-assembly/erc721-display-components

React components and hooks to display erc721 tokens leveraging the Zora Api.

## Documentation

For documentation and examples, visit [erc721-display.public---assembly.com](https://erc721-display.public---assembly.com/).

## Peer Dependencies

- @zoralabs/nft-hooks
- @zoralabs/zdk
- ethers
- swr

## Styling

While usage is not mandatory, components leverage tailwind-css and inlude component specific selectors for ease of styling.

## Installation

Install erc721-display-components and its peer dependencies.

```bash
npm install @public-assembly/erc721-display-components @zoralabs/nft-hooks @zoralabs/zdk ethers swr
```

## Usage example:

```
import React from 'react'
import { NFTGrid } from '@public-assembly/erc721-display-components'
import { useNetwork } from 'from 'wagmi'

const GOERLI_CONTRACTS = [
  '0x0fca820f55cb0c41bbf69273f903c7292a581c6e',
  '0xd38a7c591e99322ba82977c501905b75f9f5580e',
]

const MAINNET_CONTRACTS = [
  '0x5bbc122e437a0f418b64454de76a431658c5162b',
  '0xfd05b04a0040325c0d975b89f6f3aeb188fb1fbd',
]

export default function OwnerGrid() {
  const { chain } = useNetwork()

  const contracts = React.useMemo(
    () => (chain?.id === 1 ? MAINNET_CONTRACTS : GOERLI_CONTRACTS),
    [chain]
  )

  return (
    <NFTGrid
      pageSize={8}
      contractAddress={contracts}
      chainId={chain?.id.toString() as '1' | '5'}
      useIntersectionObserver
    />
  )
}

```
