import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Toaster } from 'sonner'
import '@/styles/globals.css'
import { getConfig } from '@/lib/wagmi'
import { base } from 'viem/chains'
import { PrivyProvider } from '@privy-io/react-auth'

export default function App({ Component, pageProps }: AppProps) {
	const [config] = useState(() => getConfig())
	const [queryClient] = useState(() => new QueryClient())

	return (
		// <WagmiProvider config={config} initialState={pageProps.initialState}>
		<QueryClientProvider client={queryClient}>
			<PrivyProvider
				appId='clvowjeqm07tty3bsti284qqf'
				config={{
					loginMethods: ['twitter'],
					// Customize Privy's appearance in your app
					appearance: {
						theme: 'light',
					},
					defaultChain: base,
					supportedChains: [base],
					embeddedWallets: {
						createOnLogin: 'users-without-wallets',
					},
				}}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					disableTransitionOnChange
				>
					<Toaster />
					<Component {...pageProps} />
				</ThemeProvider>
			</PrivyProvider>
		</QueryClientProvider>
		// </WagmiProvider>
	)
}
