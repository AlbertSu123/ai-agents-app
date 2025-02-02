import { base, baseSepolia } from 'viem/chains'
import { createPublicClient, Hex, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

// export const API_URL = 'http://localhost:80/api'
export const API_URL =
	'https://cd95diw9kg.us-east-1.awsapprunner.com/api'
export const DEFAULT_CHAIN = base

export const account = privateKeyToAccount(
	process.env.NEXT_PUBLIC_PRIVATE_KEY as Hex,
)

// @dev only support base
export const getPublicClient = () => {
	return createPublicClient({ chain: DEFAULT_CHAIN, transport: http() })
}
