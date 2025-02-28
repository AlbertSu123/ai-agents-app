import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { Bounty } from '../bounty'
import { API_URL } from '@/lib/constants'
import { getAccessToken, useWallets } from '@privy-io/react-auth'
import { toast } from 'sonner'

export default function FillBountyButton({ bounty }: { bounty: Bounty }) {
	const [tweetLink, setTweetLink] = useState<string | null>(null)
	const router = useRouter()
	const { wallets } = useWallets()

	const handleTransaction = async () => {
		const loading = toast.loading('Verifying tweet...')
		const tweetId = tweetLink?.match(/status\/(\d+)/)?.[1]
		const res = await fetch(`${API_URL}/tweet/verify`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${await getAccessToken()}`,
			},
			body: JSON.stringify({
				tweetId: tweetId,
				bountyId: bounty.id,
				address: wallets[0]?.address,
			}),
		})
		const data = await res.json()
		console.log(data)
		toast.dismiss(loading)
		toast.success('Bounty filled successfully')
		router.push('/filled')
	}

	return (
		<div className='flex flex-col gap-4'>
			<input
				type='text'
				placeholder='ENTER TWEET LINK'
				className='w-full p-3 border border-[#333333] bg-transparent text-white font-mono uppercase tracking-wider placeholder-[#666666] focus:outline-none focus:border-white transition-none'
				onChange={(e) => setTweetLink(e.target.value)}
				value={tweetLink || ''}
			/>
			<Button
				onClick={handleTransaction}
				disabled={!tweetLink}
				variant='outline'
				className='w-full border-white text-white font-mono uppercase tracking-wider py-3 transition-none disabled:opacity-50 disabled:cursor-not-allowed'
			>
				FILL BOUNTY
			</Button>
		</div>
	)
}
