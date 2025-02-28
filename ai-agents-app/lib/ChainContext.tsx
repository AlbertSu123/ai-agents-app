import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Chain } from 'viem'
import { DEFAULT_CHAIN, supportedChains } from './constants'

interface ChainContextType {
	currentChain: Chain
	setCurrentChain: (chain: Chain) => void
	supportedChains: Chain[]
}

const ChainContext = createContext<ChainContextType | undefined>(undefined)

export function ChainProvider({ children }: { children: ReactNode }) {
	const [currentChain, setCurrentChain] = useState<Chain>(DEFAULT_CHAIN)

	return (
		<ChainContext.Provider
			value={{
				currentChain,
				setCurrentChain,
				supportedChains,
			}}
		>
			{children}
		</ChainContext.Provider>
	)
}

export function useChain() {
	const context = useContext(ChainContext)
	if (context === undefined) {
		throw new Error('useChain must be used within a ChainProvider')
	}
	return context
}
