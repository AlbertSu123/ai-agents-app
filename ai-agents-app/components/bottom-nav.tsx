import { BirdIcon, GiftIcon, HomeIcon, PenIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const BottomNav = () => {
	const router = useRouter()

	return (
		<div className='sm:hidden'>
			<nav className='fixed bottom-0 w-full border-t border-[#333333] bg-[#111111] pb-safe'>
				<div className='mx-auto flex h-16 max-w-md items-center justify-around px-6'>
					{links.map(({ href, label, icon }) => (
						<Link
							key={label}
							href={href}
							className={`flex h-full w-full flex-col items-center justify-center space-y-1 ${
								label === 'Create'
									? router.pathname === href
										? 'text-green-400'
										: 'text-green-500 hover:text-green-400'
									: router.pathname === href
										? 'text-white'
										: 'text-[#AAAAAA] hover:text-white'
							}`}
						>
							{icon}
							<span className='text-xs font-mono uppercase tracking-wider'>
								{label}
							</span>
						</Link>
					))}
				</div>
			</nav>
		</div>
	)
}

export default BottomNav

const links = [
	{
		label: 'Home',
		href: '/',
		icon: <HomeIcon />,
	},
	{
		label: 'Create',
		href: '/create',
		icon: <PenIcon />,
	},
	{
		label: 'Filled',
		href: '/filled',
		icon: <GiftIcon />,
	},
	{
		label: 'Tweets',
		href: '/tweets',
		icon: <BirdIcon />,
	},
]
