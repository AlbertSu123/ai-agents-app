import React from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { parseGwei } from 'viem'
import { bountyAddress, bountyABI } from '@/lib/contracts/Bounty'

export default function RedeemButton({
	password,
}: {
	password: string | null
}) {
	const { primaryWallet, network } = useDynamicContext()
	const router = useRouter()

	const handleTransaction = async () => {
		if (!password) {
			return
		}

		if (primaryWallet && isEthereumWallet(primaryWallet) && network) {
			const loading = toast.loading('Redeeming link...')
			const client = await primaryWallet.getWalletClient(network.toString())
			const redeemTx = await client.writeContract({
				address: bountyAddress[Number(network)],
				abi: bountyABI,
				functionName: 'redeemLink',
				args: [password],
				gasPrice: Number(network) === 545 ? parseGwei('20') : undefined,
			})
			toast.dismiss(loading)
			toast.success('Token redeemed!')
			router.push('/')
		}
	}
	return (
		<div>
			<Button onClick={handleTransaction} disabled={!password}>
				Redeem
			</Button>
		</div>
	)
}
