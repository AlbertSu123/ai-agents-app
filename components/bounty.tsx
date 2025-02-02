import FillBountyButton from './buttons/FillBountyButton'
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
		twitterHandle: string
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
		<div className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100'>
			<div className='p-6'>
				{/* Header Section */}
				<div className='flex justify-between items-start mb-6'>
					<div className='space-y-2'>
						<h3 className='text-xl font-semibold text-gray-900'>
							{bounty.title}
						</h3>
						<p className='text-gray-600 text-sm leading-relaxed'>
							{bounty.description}
						</p>
						<div className='flex items-center gap-2 text-sm text-gray-500'>
							<span>Posted by</span>
							<span className='font-medium text-gray-700'>
								@{bounty.creatingUsername}
							</span>
						</div>
					</div>
					<div
						className={`px-4 py-1.5 rounded-full text-sm font-medium ${
							isActive
								? 'bg-green-50 text-green-700 border border-green-200'
								: 'bg-gray-50 text-gray-600 border border-gray-200'
						}`}
					>
						{isActive ? 'Active' : 'Completed'}
					</div>
				</div>

				{/* Reward and Views Section */}
				<div className='grid grid-cols-2 gap-6 mb-6'>
					<div className='border border-gray-200 rounded-xl p-4'>
						<p className='text-sm text-gray-500 mb-1'>Reward</p>
						<p className='text-2xl font-bold text-gray-900'>
							{Number(bounty.value)} USDC
						</p>
					</div>
					<div className='border border-gray-200 rounded-xl p-4'>
						<p className='text-sm text-gray-500 mb-1'>Required Views</p>
						<p className='text-2xl font-bold text-gray-900'>
							{bounty.bountyScore.toLocaleString()}
						</p>
					</div>
				</div>

				{/* Action Button for Active Bounties */}
				{isActive && (
					<div className='mt-4'>
						<FillBountyButton bounty={bounty} />
					</div>
				)}

				{/* Completion Details Section */}
				{!isActive && (
					<div className='space-y-6'>
						<div className='flex justify-center'>
							<Tweet id={bounty.tweetId} />
						</div>
						<div className='flex flex-col items-center gap-1 text-sm text-gray-600'>
							<div className='flex items-center gap-2'>
								<span>Completed by</span>
								<span className='font-medium text-gray-900'>
									@{bounty.fillingUser?.twitterHandle}
								</span>
							</div>
							<p className='text-gray-500'>
								{bounty.filled
									? new Date(bounty.filled).toLocaleDateString('en-US', {
											month: 'long',
											day: 'numeric',
											year: 'numeric',
											hour: '2-digit',
											minute: '2-digit',
										})
									: ''}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
