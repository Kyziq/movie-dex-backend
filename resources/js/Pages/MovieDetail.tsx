// src/Pages/MovieDetail.tsx
import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'

interface Movie {
	id: number
	title: string
	description: string
	release_date: string
	image_url: string
	rating: number
	genres?: string[]
}

interface MovieDetailProps extends PageProps {
	movie: Movie
}

const MovieDetail: React.FC<MovieDetailProps> = ({ auth, movie }) => {
	const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const comment = formData.get('comment') as string
		const rating = formData.get('rating') as string

		console.log('Comment: ', comment)
		console.log('Rating: ', rating)
		// Here you would typically make an API call to save the comment and rating
		// axios.post('/api/comments', { movieId: movie.id, comment, rating });
	}

	return (
		<AuthenticatedLayout user={auth.user}>
			<div className='movie-info border-b border-gray-800'>
				<div className='container mx-auto flex flex-col px-4 py-16 md:flex-row'>
					<div className='flex-none'>
						<img src={movie.image_url} alt='poster' className='w-64 lg:w-96' />
					</div>
					<div className='md:ml-24'>
						<h2 className='text-4xl font-semibold'>{movie.title}</h2>
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
			</div>
		</AuthenticatedLayout>
	)
}

export default MovieDetail
