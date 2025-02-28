import { useLogin, usePrivy } from '@privy-io/react-auth'
import { Button } from './ui/button'
import { API_URL } from '@/lib/constants'

export const PrivyLoginButton = () => {
	const { user, logout } = usePrivy()
	const { login } = useLogin({
		onComplete({ user }) {
			const login = async () => {
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
			login()
		},
	})
	if (!user) {
		return (
			<Button
				onClick={() => login()}
				variant='outline'
				className='border-white hover:bg-[#333333]'
			>
				LOGIN
			</Button>
		)
	}

	return (
		<div className='flex items-center gap-2'>
			<Button
				onClick={() => logout()}
				variant='outline'
				className='border-white hover:bg-[#333333]'
			>
				LOGOUT @{user.twitter?.username}
			</Button>
		</div>
	)
}
