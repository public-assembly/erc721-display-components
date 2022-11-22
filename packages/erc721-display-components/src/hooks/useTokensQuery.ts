import * as React from 'react'
import { getAddress } from '@ethersproject/address'
import { transformNFTZDK } from '@zoralabs/nft-hooks/dist/backends'
import { prepareJson } from '@zoralabs/nft-hooks/dist/fetcher/NextUtils'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { TokensQueryArgs, ZDK, ZDKChain, ZDKNetwork } from '@zoralabs/zdk'
import {
  TokenSortInput,
  TokensQueryFilter,
  TokensQueryInput,
} from '@zoralabs/zdk/dist/queries/queries-sdk'
import flatten from 'lodash/flatten'
import useSWRInfinite from 'swr/infinite'

const PAGE_SIZE = 12

export type UseTokenQueryProps = {
  /**
   * contractWhiteList: array of contract addresses
   * @default: undefined
   */
  contractWhiteList?: string[]
  contractAddress?: string | string[] | null
  chainId?: '1' | '5'
  ownerAddress?: string
  sort?: TokenSortInput
  filter?: TokensQueryFilter
  where?: TokensQueryInput
  /**
   * pageSize: pagination length for request
   * @default: 12
   */
  pageSize?: number
  /**
   * zoraApiKey: user api key for the zora api.
   * https://docs.zora.co/docs/zora-api/intro#authentication
   * @default: undefined
   */
  zoraApiKey?: string
}

type GetNFTReturnType = {
  tokens: NFTObject[]
  nextCursor?: string | null
}

export function useTokensQuery({
  contractWhiteList,
  contractAddress,
  chainId = '1',
  ownerAddress,
  sort,
  filter,
  where,
  pageSize = PAGE_SIZE,
  zoraApiKey,
}: UseTokenQueryProps) {
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

  async function getNFTs(query: TokensQueryArgs): Promise<GetNFTReturnType> {
    const resp = await zdk.tokens(query)
    const tokens = resp.tokens.nodes
      .map((token) => transformNFTZDK(token, { rawData: token }))
      .map(prepareJson)
    return {
      tokens,
      nextCursor: resp.tokens.pageInfo.endCursor,
    }
  }

  const getKey = (pageIndex: number, previousPageData: GetNFTReturnType) => {
    if (pageIndex > 0 && !previousPageData.nextCursor) return null
    return {
      where: {
        ...(contractAddress && {
          collectionAddresses: ownerAddress
            ? contractWhiteList
            : Array.isArray(contractAddress)
            ? contractAddress
            : getAddress(contractAddress),
        }),
        ...(ownerAddress && {
          collectionAddresses: contractWhiteList,
          ownerAddresses: [getAddress(ownerAddress)],
        }),
        ...where,
      },
      sort,
      filter,
      pagination: {
        after: previousPageData?.nextCursor,
        limit: pageSize,
      },
      includeFullDetails: true,
    }
  }

  const {
    data: resp,
    error,
    setSize,
    size,
    isValidating,
  } = useSWRInfinite<GetNFTReturnType>(getKey, getNFTs, {
    refreshInterval: 5000,
  })

  const data = resp?.map((r) => r.tokens)

  const handleLoadMore = React.useCallback(() => setSize(size + 1), [setSize, size])

  const isLoadingInitialData = !data && !error

  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')

  const isEmpty = data?.[0]?.length === 0

  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < pageSize)

  const isRefreshing = isValidating && data && data.length === size

  return {
    data: flatten(data),
    isValidating,
    isRefreshing,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    handleLoadMore,
  }
}
