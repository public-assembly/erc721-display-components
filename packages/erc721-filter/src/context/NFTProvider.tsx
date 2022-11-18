import * as React from 'react'
import { createContext, useContext } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks'

export interface NFTContext {
  nftData?: NFTObject
  tokenId?: string
  contractAddress?: string
}

export type NFTProps = {
  children?: React.ReactNode
} & NFTContext

const NFTContext = createContext<NFTContext>({
  nftData: undefined,
})

export function useNFTProvider() {
  return useContext(NFTContext)
}

export function NFTProvider({ contractAddress, tokenId, nftData, children }: NFTProps) {
  return (
    <NFTContext.Provider
      value={{
        nftData,
        tokenId,
        contractAddress,
      }}>
      {children}
    </NFTContext.Provider>
  )
}
