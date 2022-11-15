import * as React from 'react'
import { createContext, useContext } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks'

export interface NFTContext {
  nft?: NFTObject
  tokenId?: string
  contractAddress?: string
}

export type NFTProps = {
  children?: React.ReactNode
} & NFTContext

const NFTContext = createContext<NFTContext>({
  nft: undefined,
})

export function useNFTProvider() {
  return useContext(NFTContext)
}

export function NFTProvider({ contractAddress, tokenId, nft, children }: NFTProps) {
  return (
    <NFTContext.Provider
      value={{
        nft,
        tokenId,
        contractAddress,
      }}>
      {children}
    </NFTContext.Provider>
  )
}
