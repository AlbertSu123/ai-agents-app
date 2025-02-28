import React, { useState, useRef, useEffect } from 'react'
import { useChain } from '@/lib/ChainContext'
import { Chain } from 'viem'
import { cn } from '@/lib/utils'

export function ChainSelector() {
	const { currentChain, setCurrentChain, supportedChains } = useChain()
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center px-4 py-2 text-sm font-mono uppercase tracking-wider border border-white text-white hover:bg-[#333333]'
			>
				{currentChain.name}
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='ml-1'
				>
					<path d='m6 9 6 6 6-6' />
				</svg>
			</button>

			{isOpen && (
				<div className='absolute right-0 mt-0 w-48 bg-[#111111] border border-[#333333] z-50'>
					<div className='py-0'>
						{supportedChains.map((chain: Chain) => (
							<button
								key={chain.id}
								onClick={() => {
									setCurrentChain(chain)
									setIsOpen(false)
								}}
								className={cn(
									'block w-full text-left px-4 py-2 text-sm font-mono uppercase tracking-wider border-b border-[#333333] last:border-b-0',
									currentChain.id === chain.id
										? 'bg-[#333333] text-white'
										: 'text-[#AAAAAA] hover:bg-[#222222]',
								)}
							>
								{chain.name}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
