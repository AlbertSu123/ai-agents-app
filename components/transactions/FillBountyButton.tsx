import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { Bounty } from '../bounty'
import { API_URL } from '@/lib/constants'
import { getAccessToken, useWallets } from '@privy-io/react-auth'

export default function FillBountyButton({ bounty }: { bounty: Bounty }) {
	const [tweetLink, setTweetLink] = useState<string | null>(null)
	const router = useRouter()
	const { wallets } = useWallets()

	const handleTransaction = async () => {
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
	}

	return (
		<div className='flex flex-col gap-4'>
			<input
				type='text'
				placeholder='Enter Tweet Link'
				className='w-full p-3 border rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
				onChange={(e) => setTweetLink(e.target.value)}
				value={tweetLink || ''}
			/>
			<Button
				onClick={handleTransaction}
				disabled={!tweetLink}
				className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
			>
				Fill Bounty
			</Button>
		</div>
	)
}
