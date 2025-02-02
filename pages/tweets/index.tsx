import Page from '@/components/page'
import { useEffect, useState } from 'react'
import Section from '@/components/section'
import { API_URL } from '@/lib/constants'
import { Tweet } from 'react-tweet'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

type Tweet = {
	id: string
	address: string
	content: string
	author: string
	viewCount: number
	likes: number
	retweets: number
	comments: number
	bookmarks: number
	createdAt: Date
	updatedAt: Date
}

export default function TweetStream() {
	const [tweets, setTweets] = useState<Tweet[]>([])
	const [loading, setLoading] = useState(true)

	const fetchTweets = async () => {
		setLoading(true)
		try {
			const res = await fetch(`${API_URL}/tweet`)
			const data = await res.json()
			setTweets(data)
		} catch (error) {
			console.error('Error fetching tweets:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchTweets()
	}, [])

	if (loading) {
		return (
			<Page>
				<Section>
					<div className='flex justify-center items-center min-h-[200px]'>
						<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
					</div>
				</Section>
			</Page>
		)
	}

	return (
		<Page>
			<Section>
				<div className='max-w-xl mx-auto px-4'>
					<div className='flex justify-between items-center mb-6'>
						<h1 className='text-2xl font-bold'>Latest Tweets</h1>
						<Button
							variant='ghost'
							size='sm'
							onClick={fetchTweets}
							className='hover:bg-gray-100'
						>
							<RefreshCw className='h-4 w-4' />
						</Button>
					</div>
					<div className='space-y-4'>
						{tweets.map((tweet) => (
							<div key={tweet.id} className='bg-white rounded-lg p-4'>
								<Tweet id={tweet.id} />
							</div>
						))}
					</div>
				</div>
			</Section>
		</Page>
	)
}
