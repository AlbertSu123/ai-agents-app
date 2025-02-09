import Link from 'next/link'
import { useRouter } from 'next/router'
import { PrivyLoginButton } from './PrivyLoginButton'

const links = [
	{ label: 'Create Bounty', href: '/create' },
	{ label: 'Filled Bounties', href: '/filled' },
	{ label: 'Tweets', href: '/tweets' },
]

const Appbar = () => {
	const router = useRouter()

	return (
		<div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe'>
			<header className='border-b bg-zinc-100 px-safe dark:border-zinc-800 dark:bg-zinc-900'>
				<div className='mx-auto flex h-20 max-w-screen-md items-center justify-between px-6'>
					<Link
						href='/'
						className='hover:opacity-80 transition-opacity flex items-center'
					>
						<img
							src='/images/favicon.png'
							alt='TEETwitter Logo'
							className='w-6 h-6 mr-2'
						/>
						<h1 className='font-medium text-lg'>Twitter Bounties</h1>
					</Link>
					<nav className='flex items-center space-x-6'>
						<div className='hidden sm:block'>
							<div className='flex items-center space-x-6'>
								{links.map(({ label, href }) => (
									<Link
										key={label}
										href={href}
										className={`text-sm font-medium transition-colors ${
											router.pathname === href
												? 'text-custom-primary'
												: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
										}`}
									>
										{label}
									</Link>
								))}
							</div>
						</div>
					</nav>
					<PrivyLoginButton />
				</div>
			</header>
		</div>
	)
}

export default Appbar
