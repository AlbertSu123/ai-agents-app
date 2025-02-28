import { useChain } from '../ChainContext'
import { getPublicClient } from '../constants'

export function usePublicClient() {
	const { currentChain } = useChain()
	return getPublicClient(currentChain)
}
