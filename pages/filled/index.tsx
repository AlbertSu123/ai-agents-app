import BountyCard, { Bounty } from '@/components/bounty'
import { USDCIcon } from '@/components/icons/USDCIcon'
import Page from '@/components/page'
import Section from '@/components/section'
import { Button } from '@/components/ui/button'
import { API_URL } from '@/lib/constants'
import { usePrivy } from '@privy-io/react-auth'
import { useEffect, useState } from 'react'

const Index = () => {
	const { login, user } = usePrivy()
	const [bounties, setBounties] = useState<Bounty[]>([])

	useEffect(() => {
		const fetchBounties = async () => {
			const res = await fetch(`${API_URL}/bounty/filled`)
			const data = await res.json()
			setBounties(data)
		}
		fetchBounties()
	}, [])

	if (!user) {
		return (
			<Page>
				<Section>
					<div className='container mx-auto px-4 flex flex-col items-center justify-center min-h-screen'>
						<h1 className='text-5xl font-extrabold text-center mb-6 text-black shadow-text'>
							Get paid for your banger tweets
						</h1>
						<h2 className='text-2xl text-center mb-8 text-black shadow-text'>
							Pay high performing KOLs, not mediocre ones
						</h2>
						<div className='flex justify-center'>
							<Button onClick={() => login()}>Login</Button>
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
					{bounties.map((bounty) => (
						<BountyCard key={bounty.tweetId} bounty={bounty} />
					))}
				</div>
			</Section>
		</Page>
	)
}

export default Index
