import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { coinbaseWallet } from 'wagmi/connectors'
import { DEFAULT_CHAIN, supportedChains } from './constants'
import { Chain } from 'viem'

export function getConfig(currentChain = DEFAULT_CHAIN) {
	// Create a transports object with all supported chains
	const transports = supportedChains.reduce(
		(acc: Record<number, ReturnType<typeof http>>, chain: Chain) => {
			acc[chain.id] = http()
			return acc
		},
		{} as Record<number, ReturnType<typeof http>>,
	)

	return createConfig({
		chains: [currentChain],
		connectors: [
			coinbaseWallet({
				appName: 'OnchainKit',
				preference: 'smartWalletOnly',
				version: '4',
			}),
		],
		storage: createStorage({
			storage: cookieStorage,
		}),
		ssr: true,
		transports,
	})
}

export const config = getConfig()

declare module 'wagmi' {
	interface Register {
		config: ReturnType<typeof getConfig>
	}
}
