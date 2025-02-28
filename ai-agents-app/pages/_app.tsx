import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Toaster } from 'sonner'
import '@/styles/globals.css'
import { getConfig } from '@/lib/wagmi'
import { PrivyProvider } from '@privy-io/react-auth'
import { ChainProvider, useChain } from '@/lib/ChainContext'
import { DEFAULT_CHAIN, supportedChains } from '@/lib/constants'
import { Chain } from 'viem'

// Wrap the app with ChainProvider
function AppWithChainProvider({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<ChainProvider>
			<AppContent
				Component={Component}
				pageProps={pageProps}
				queryClient={queryClient}
			/>
		</ChainProvider>
	)
}

// Inner component that can access the chain context
function AppContent({
	Component,
	pageProps,
	queryClient,
}: {
	Component: AppProps['Component']
	pageProps: AppProps['pageProps']
	queryClient: QueryClient
}) {
	const { currentChain } = useChain()
	const [config, setConfig] = useState(() => getConfig(currentChain as any))

	// Update config when chain changes
	useEffect(() => {
		setConfig(getConfig(currentChain as any))
	}, [currentChain])

	return (
		<QueryClientProvider client={queryClient}>
			<PrivyProvider
				appId='clvowjeqm07tty3bsti284qqf'
				config={{
					loginMethods: ['twitter'],
					appearance: {
						theme: 'dark',
						accentColor: '#FFFFFF',
						showWalletLoginFirst: false,
					},
					defaultChain: currentChain,
					supportedChains: supportedChains,
					embeddedWallets: {
						createOnLogin: 'users-without-wallets',
					},
				}}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					forcedTheme='dark'
					disableTransitionOnChange
				>
					<Toaster
						theme='dark'
						toastOptions={{
							style: {
								fontFamily: 'JetBrains Mono, monospace',
								background: '#111111',
								color: '#FFFFFF',
								border: '1px solid #333333',
								borderRadius: '0',
							},
						}}
					/>
					<Component {...pageProps} />
				</ThemeProvider>
			</PrivyProvider>
		</QueryClientProvider>
	)
}

export default AppWithChainProvider
