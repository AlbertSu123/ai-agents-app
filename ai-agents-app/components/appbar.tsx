import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import { ChainSelector } from './ChainSelector'
import { API_URL } from '@/lib/constants'

// Updated links to match the image exactly
const links = [
	{ label: 'CREATE', href: '/create' },
	{ label: 'FILLED BOUNTIES', href: '/filled' },
	{ label: 'TWEETS', href: '/tweets' },
]

const Appbar = () => {
	const router = useRouter()
	const { authenticated, user, logout } = usePrivy()
	const { login } = useLogin({
		onComplete({ user }) {
			const loginUser = async () => {
				const res = await fetch(`${API_URL}/user`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						address: user?.wallet?.address,
						twitterHandle: user?.twitter?.username,
					}),
				})
				const data = await res.json()
				console.log(data)
			}
			loginUser()
		},
	})

	return (
		<div className='fixed top-0 left-0 z-20 w-full bg-[#111111] pt-safe'>
			<header className='border-b border-[#333333] bg-[#111111] px-safe'>
				<div className='flex h-16 items-center justify-between px-6'>
					<div className='flex items-center'>
						<Link
							href='/'
							className='hover:text-[#666666] transition-none flex items-center'
						>
							<img
								src='/images/favicon.png'
								alt='Twitter Bounties Logo'
								className='w-6 h-6 mr-2'
							/>
							<span className='font-mono uppercase tracking-wider text-lg'>
								Twitter Bounties
							</span>
						</Link>

						{/* Hide navigation links on mobile screens */}
						<nav className='hidden md:flex items-center space-x-6 ml-8'>
							{links.map(({ label, href }) => (
								<Link
									key={label}
									href={href}
									className={`text-sm font-mono uppercase tracking-wider transition-none ${
										label === 'CREATE'
											? router.pathname === href
												? 'text-green-400'
												: 'text-green-500 hover:text-green-400'
											: router.pathname === href
												? 'text-white'
												: 'text-[#AAAAAA] hover:text-white'
									}`}
								>
									{label}
								</Link>
							))}
						</nav>
					</div>

					<div className='flex items-center space-x-4'>
						{/* Only show ChainSelector on medium screens and up */}
						{authenticated && (
							<div className='hidden md:block'>
								<ChainSelector />
							</div>
						)}
						{authenticated ? (
							<button
								onClick={() => logout()}
								className='px-4 py-2 text-sm font-mono uppercase tracking-wider border border-white text-white hover:bg-[#333333] truncate max-w-[180px]'
							>
								Logout @{user?.twitter?.username || ''}
							</button>
						) : (
							<button
								onClick={() => login()}
								className='px-4 py-2 text-sm font-mono uppercase tracking-wider border border-white text-white hover:bg-[#333333]'
							>
								Login
							</button>
						)}
					</div>
				</div>
			</header>
		</div>
	)
}

export default Appbar
