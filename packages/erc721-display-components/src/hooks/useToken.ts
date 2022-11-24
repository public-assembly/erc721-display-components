/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import { transformNFTZDK } from '@zoralabs/nft-hooks/dist/backends'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { ZDK, ZDKChain, ZDKNetwork } from '@zoralabs/zdk'
import { NetworkInput } from '@zoralabs/zdk/dist/queries/queries-sdk'

export type UseTokenProps = {
  contractAddress: string
  tokenId: string
  zoraApiKey?: string
  chainId?: '1' | '5'
}

/* { address: contractAddress, tokenId: tokenId } */

export function useToken({ contractAddress, tokenId, zoraApiKey, chainId }: UseTokenProps) {
  const zdk = new ZDK({
    endpoint: 'https://api.zora.co/graphql',
    apiKey: zoraApiKey,
    networks: [
      {
        chain: ZDKChain[`${chainId === '5' ? 'Goerli' : 'Mainnet'}`],
        network: ZDKNetwork.Ethereum,
      },
    ],
  })

  async function getNFT(contractAddress: string, tokenId: string): Promise<NFTObject> {
    const resp = await zdk.token({
      token: {
        address: contractAddress,
        tokenId: tokenId
      },
      network: chainId as NetworkInput,
      includeFullDetails: true
    });
    const token = resp?.token
    return transformNFTZDK(token, { rawData: token })
  }
  
  const { data, error } = useSWR(
    [`${contractAddress}-${tokenId}`],
    () => getNFT(contractAddress, tokenId),
    {
      onErrorRetry: (_, _1, _2, revalidate, { retryCount }) => {
        if (retryCount >= 2) return
        setTimeout(() => revalidate({ retryCount }), 5000)
      },
      dedupingInterval: 10000,
      refreshInterval: 5000,
    }
  )

  return {
    data,
    error,
  }
}
