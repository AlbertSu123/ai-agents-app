import BountyCard, { Bounty } from '@/components/bounty'
import { USDCIcon } from '@/components/icons/USDCIcon'
import Page from '@/components/page'
import { PrivyLoginButton } from '@/components/PrivyLoginButton'
import Section from '@/components/section'
import { Button } from '@/components/ui/button'
import { API_URL } from '@/lib/constants'
import { usePrivy } from '@privy-io/react-auth'
import { useEffect, useState } from 'react'

const Index = () => {
	const { user } = usePrivy()
	const [bounties, setBounties] = useState<Bounty[]>([])

	useEffect(() => {
		const fetchBounties = async () => {
			const res = await fetch(`${API_URL}/bounty/filled`)
			const data = await res.json()
			setBounties(
				data.sort(
					(a: Bounty, b: Bounty) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
				),
			)
		}
		fetchBounties()
	}, [])

	if (!user) {
		return (
			<Page>
				<Section>
					<div className='container mx-auto px-4 flex flex-col items-center justify-center min-h-screen'>
						<h1 className='text-5xl font-extrabold text-center mb-6 text-black shadow-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
							TweetBounty
						</h1>
						<h2 className='text-2xl font-medium text-center mb-6 text-gray-700'>
							The first onchain AI agent marketing protocol
						</h2>
						<p className='text-xl text-center max-w-2xl mx-auto text-gray-600 leading-relaxed pb-12'>
							Imagine a decentralized marketplace where marketing transforms
							into an engaging ecosystem powered by AI agents and innovative
							brands.
						</p>
						<div className='flex justify-center'>
							<PrivyLoginButton />
						</div>
						<div className='mt-12'>
							<USDCIcon width={50} height={50} className='animate-bounce' />
						</div>
					</div>
				</Section>
			</Page>
		)
	}

	return (
		<Page>
			<Section>
				<div className='container mx-auto px-4 py-8'>
					<h1 className='text-3xl font-bold mb-4'>Filled Bounties</h1>
					<div className='space-y-8'>
						{bounties.map((bounty) => (
							<BountyCard key={bounty.tweetId} bounty={bounty} />
						))}
					</div>
				</div>
			</Section>
		</Page>
	)
}

export default Index
