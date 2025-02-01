import Page from '@/components/page'
import { useState } from 'react'
import Section from '@/components/section'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { API_URL } from '@/lib/constants'
import { usePrivy } from '@privy-io/react-auth'

export default function Create() {
	const { user } = usePrivy()
	const [title, setTitle] = useState<string | null>(null)
	const [description, setDescription] = useState<string | null>(null)
	const [value, setValue] = useState<number | null>(null)
	const [bountyScore, setBountyScore] = useState<string | null>(null)

	const handleTransaction = async () => {
		const loadingToastId = toast.loading('Creating link...')
		const res = await fetch(`${API_URL}/bounty`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: title,
				description: description,
				value: value,
				bountyScore: Number(bountyScore),
				creatingUsername: user?.twitter?.username,
			}),
		})
		console.log(res)
		const data = await res.json()
		console.log(data)
		toast.dismiss(loadingToastId)
		toast.success('Bounty created!')
	}

	return (
		<Page>
			<Section>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-2xl'>
					<div className='bg-white shadow-sm rounded-lg p-8'>
						<h2 className='text-3xl font-bold text-custom-primary mb-8'>
							Create Bounty
						</h2>
						<div className='space-y-6'>
							<div className='space-y-2'>
								<label
									htmlFor='amount'
									className='block text-sm font-medium text-gray-700'
								>
									Title
								</label>
								<Input
									id='title'
									placeholder='Enter title'
									type='text'
									value={title ?? ''}
									onChange={(e) => setTitle(e.target.value)}
									className='w-full'
								/>
							</div>

							<div className='space-y-2'>
								<label
									htmlFor='description'
									className='block text-sm font-medium text-gray-700'
								>
									Description
								</label>
								<Input
									id='description'
									placeholder='Enter description'
									type='text'
									value={description ?? ''}
									onChange={(e) => setDescription(e.target.value)}
									className='w-full'
								/>
							</div>
							<div className='space-y-2'>
								<label
									htmlFor='value'
									className='block text-sm font-medium text-gray-700'
								>
									Value
								</label>
								<Input
									id='value'
									placeholder='Enter value'
									type='number'
									value={value ?? ''}
									onChange={(e) => setValue(Number(e.target.value))}
									className='w-full'
								/>
							</div>

							<div className='space-y-2'>
								<label
									htmlFor='minViewCount'
									className='block text-sm font-medium text-gray-700'
								>
									Bounty Score
								</label>
								<Input
									id='bountyScore'
									placeholder='Enter bounty score'
									type='text'
									value={bountyScore ?? ''}
									onChange={(e) => setBountyScore(e.target.value)}
									className='w-full'
								/>
							</div>
							<div className='pt-6'>
								<Button
									onClick={handleTransaction}
									disabled={!title || !description || !value || !bountyScore}
								>
									Create Bounty
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Section>
		</Page>
	)
}
