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
