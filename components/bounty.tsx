import { Address, zeroAddress } from 'viem'
import { formatAddress } from '@/lib/utils'
import FillBountyButton from './transactions/FillBountyButton'
import { Tweet } from 'react-tweet'

export type Bounty = {
	id: string
	title: string
	description: string
	value: number
	bountyScore: number
	fillingUserId: string | null
	fillingUser?: {
		id: string
		// Add other user fields as needed
	}
	filled: Date | null
	createdAt: Date
	updatedAt: Date
	creatingUsername: string
	tweetId: string
}

export default function BountyCard({ bounty }: { bounty: Bounty }) {
	const isActive = bounty.filled == null

	return (
		<div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
			<div className='flex justify-between items-start mb-4'>
				<div>
					<h3 className='text-lg font-semibold mb-1'>
						Tweet Keyword: <span className='text-blue-600'>{bounty.title}</span>
					</h3>
					<p className='text-sm text-gray-600'>
						Created by: {bounty.creatingUsername}
					</p>
				</div>
				<div
					className={`px-3 py-1 rounded-full text-sm ${
						isActive
							? 'bg-green-100 text-green-800'
							: 'bg-gray-100 text-gray-800'
					}`}
				>
					{isActive ? 'Active' : 'Completed'}
				</div>
			</div>

			<div className='grid grid-cols-2 gap-4 mb-4'>
				<div className='bg-gray-50 p-3 rounded-lg'>
					<p className='text-sm text-gray-600'>Reward Amount</p>
					<p className='text-lg font-semibold'>{Number(bounty.value)} USDC</p>
				</div>
				<div className='bg-gray-50 p-3 rounded-lg'>
					<p className='text-sm text-gray-600'>Required Views</p>
					<p className='text-lg font-semibold'>
						{bounty.bountyScore.toLocaleString()}
					</p>
				</div>
			</div>

			{!isActive && (
				<div className='border-t pt-4 mt-4'>
					<p className='text-sm text-gray-600'>
						Completed by: {bounty.fillingUser?.id}
					</p>
					<p className='text-sm text-gray-600'>
						Completed at:{' '}
						{new Date(Number(bounty.filled) * 1000).toLocaleDateString()}
					</p>
					<Tweet id={bounty.tweetId} />
				</div>
			)}
			{isActive && <FillBountyButton bountyId={bounty.id} />}
		</div>
	)
}
