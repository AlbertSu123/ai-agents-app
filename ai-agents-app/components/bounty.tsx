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
		<div className='bg-[#111111] border border-[#333333] hover:border-[#666666] transition-none'>
			<div className='p-6'>
				{/* Header Section */}
				<div className='flex justify-between items-start mb-6'>
					<div className='space-y-2'>
						<h3 className='text-xl font-mono uppercase tracking-wider text-white'>
							{bounty.title}
						</h3>
						<p className='text-[#AAAAAA] text-sm font-mono leading-relaxed'>
							{bounty.description}
						</p>
						<div className='flex items-center gap-2 text-sm text-[#666666] font-mono'>
							<span>POSTED BY</span>
							<span className='font-medium text-white'>
								@{bounty.creatingUsername}
							</span>
						</div>
					</div>
					<div
						className={`px-4 py-1.5 text-sm font-mono uppercase tracking-wider ${
							isActive
								? 'bg-transparent text-white border border-white'
								: 'bg-transparent text-[#666666] border border-[#333333]'
						}`}
					>
						{isActive ? 'ACTIVE' : 'COMPLETED'}
					</div>
				</div>

				{/* Reward and Views Section */}
				<div className='grid grid-cols-2 gap-6 mb-6'>
					<div className='border border-[#333333] p-4'>
						<p className='text-sm text-[#666666] mb-1 font-mono uppercase tracking-wider'>
							REWARD
						</p>
						<p className='text-2xl font-mono text-white'>
							{Number(bounty.value)} USDC
						</p>
					</div>
					<div className='border border-[#333333] p-4'>
						<p className='text-sm text-[#666666] mb-1 font-mono uppercase tracking-wider'>
							REQUIRED VIEWS
						</p>
						<p className='text-2xl font-mono text-white'>
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
						<div className='flex flex-col items-center gap-1 text-sm font-mono'>
							<div className='flex items-center gap-2 uppercase tracking-wider'>
								<span className='text-[#666666]'>COMPLETED BY</span>
								<span className='font-medium text-white'>
									@{bounty.fillingUser?.twitterHandle}
								</span>
							</div>
							<p className='text-[#666666] uppercase tracking-wider'>
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
