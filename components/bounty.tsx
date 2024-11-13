import { bountyAddress, bountyABI } from '@/lib/contracts/Bounty'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useEffect, useState } from 'react'

export default function Bounty({ bountyId }: { bountyId: string }) {
	const { primaryWallet, network } = useDynamicContext()
	const [tweetId, setTweetId] = useState<string>()
	const [keyword, setKeyword] = useState<string>()
	const [bountyToken, setBountyToken] = useState<string>()
	const [bountyCreator, setBountyCreator] = useState<string>()
	const [bountyAmount, setBountyAmount] = useState<string>()
	const [minViewCount, setMinViewCount] = useState<string>()
	const [filledAt, setFilledAt] = useState<string>()
	const [filledBy, setFilledBy] = useState<string>()

	useEffect(() => {
		const fetchBounty = async () => {
			if (primaryWallet && isEthereumWallet(primaryWallet) && network) {
				const client = await primaryWallet.getWalletClient(network.toString())
				const publicClient = await primaryWallet.getPublicClient()
				const bounty = await publicClient.readContract({
					address: bountyAddress[Number(network)],
					abi: bountyABI,
					functionName: 'bounties',
					args: [bountyId],
				})
				console.log(bounty)
			}
		}
	}, [])

	return <div>Bounty</div>
}
