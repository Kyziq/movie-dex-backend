// src/Pages/MovieDetail.tsx
import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import axios from 'axios'

interface Review {
	id: number
	user_id: number // Assuming this will later be replaced with a more descriptive identifier like username
	movie_id: number
	rating: number
	comment: string
	created_at: string
}

interface Movie {
	id: number
	title: string
	description: string
	release_date: string
	image_url: string
	genre?: string[]
	reviews: Review[]
}

interface MovieDetailProps extends PageProps {
	movie: Movie
}

const MovieDetail: React.FC<MovieDetailProps> = ({ auth, movie }) => {
	const [newComment, setNewComment] = useState('')
	const [newRating, setNewRating] = useState('')

	const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			const response = await axios.post('/review', {
				movieId: movie.id,
				comment: newComment,
				rating: parseInt(newRating, 10),
			})
			console.log('Comment saved:', response.data)
			// Add logic here to update the reviews list without reloading the page
		} catch (error) {
			console.error('Error posting comment:', error)
		}
	}

	return (
		<AuthenticatedLayout user={auth.user}>
			<div className='movie-info border-b border-gray-800'>
				<div className='container mx-auto flex flex-col px-4 py-16 md:flex-row'>
					<div className='flex-none'>
						<img src={movie.image_url} alt='poster' className='w-64 lg:w-96' />
					</div>
					<div className='md:ml-24'>
						<h2 className='mt-4 text-4xl font-semibold text-zinc-50 md:mt-0'>{movie.title}</h2>
						<div className='flex flex-wrap items-center text-sm text-gray-400'>
							<svg className='w-4 fill-current text-orange-500' viewBox='0 0 24 24'>
								<g data-name='Layer 2'>
									<path
										d='M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z'
										data-name='star'></path>
								</g>
							</svg>
							<span className='ml-1'>99%</span>
							<span className='mx-2'>|</span>
							<span>{movie.release_date}</span>
							<span className='mx-2'>|</span>
							<span>{movie.genre}</span>
						</div>
						<p className='mt-8 text-gray-300'>{movie.description}</p>
						<div className='mt-12'>
							<form onSubmit={handleCommentSubmit}>
								<textarea
									name='comment'
									placeholder='Add a comment...'
									className='textarea textarea-bordered mb-4 w-full'></textarea>
								<input
									name='rating'
									type='number'
									placeholder='Rating (1-10)'
									className='input input-bordered mb-4 w-full'
								/>
								<button type='submit' className='btn btn-primary'>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
				<div className='container mx-auto flex flex-col px-4 py-16 md:flex-row'>
					<div className='reviews mt-8'>
						<h3 className='text-lg font-semibold'>Reviews</h3>
						{movie.reviews && movie.reviews.length > 0 ? (
							movie.reviews.map(review => (
								<div key={review.id} className='review mt-4'>
									<div className='flex items-center'>
										<span className='font-semibold'>{`User ID: ${review.user_id}`}</span>
										<span className='ml-4 text-sm text-gray-500'>
											{new Date(review.created_at).toLocaleDateString()}
										</span>
									</div>
									<p className='mt-1'>{review.comment || 'No comments'}</p>
									<p className='text-gray-500'>Rating: {review.rating}</p>
								</div>
							))
						) : (
							<p>No reviews available.</p>
						)}
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}

export default MovieDetail
