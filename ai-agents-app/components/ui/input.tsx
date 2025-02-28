import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-9 w-full rounded-none border border-[#333333] bg-transparent px-3 py-1 text-sm font-mono uppercase tracking-wider transition-none file:border-0 file:bg-transparent file:text-sm file:font-mono placeholder:text-[#666666] focus-visible:outline-none focus-visible:border-white disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				ref={ref}
				{...props}
			/>
		)
	},
)
Input.displayName = 'Input'

export { Input }
