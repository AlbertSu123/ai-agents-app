import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-mono uppercase tracking-wider transition-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'bg-[#111111] text-white border border-white hover:bg-[#333333]',
				destructive:
					'bg-[#111111] text-red-500 border border-red-500 hover:bg-[#333333]',
				outline:
					'border border-white bg-transparent text-white hover:bg-[#333333]',
				secondary:
					'bg-[#333333] text-white border border-[#666666] hover:bg-[#444444]',
				ghost: 'hover:bg-[#333333] text-white',
				link: 'text-white underline-offset-4 hover:underline',
				enlist:
					'bg-transparent text-white border-none hover:text-[#666666] flex items-center',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 px-3 text-xs',
				lg: 'h-10 px-8',
				icon: 'h-9 w-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
