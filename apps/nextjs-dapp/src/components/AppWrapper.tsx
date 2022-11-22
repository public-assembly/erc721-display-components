import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { createClient, chain, configureChains, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { SWRConfig } from 'swr'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [
    jsonRpcProvider({
      priority: 0,
      rpc: (chain) =>
        chain.id === 1
          ? { http: 'https://rpc.ankr.com/eth' }
          : { http: 'https://rpc.ankr.com/eth_goerli' },
    }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'ExampleNextjsDapp',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

/* @ts-ignore */
export function AppWrapper({ children }: { children: JSX.Element }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        coolMode
        theme={lightTheme({
          accentColor: 'black',
          borderRadius: 'large',
        })}>
        <SWRConfig
          value={{
            fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
          }}>
          {children}
        </SWRConfig>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
