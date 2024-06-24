import React, { useState, useEffect, Fragment } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Guest from '@/Layouts/Guest'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { PageProps } from '@/types'
import axios, { AxiosError } from 'axios'

const REVIEWS_PER_PAGE = 5

interface Review {
	id: number
	user: User
	user_id: number
	movie_id: number
	rating: number
	comment: string
	created_at: string
}

interface User {
	id: number
	name: string
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
	const [newRating, setNewRating] = useState(0)
	const [reviews, setReviews] = useState<Review[]>([])
	const [openReviewId, setOpenReviewId] = useState<number | null>(null)
	const [editedComment, setEditedComment] = useState('')
	const [editingReviewId, setEditingReviewId] = useState<number | null>(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalReviews, setTotalReviews] = useState(0)

	const fetchReviews = async (page: number = 1) => {
		try {
			const response = await axios.get(`/reviews?movie_id=${movie.id}&page=${page}`)
			setReviews(response.data.data) // Paginated data is usually inside `data`
			setTotalReviews(response.data.total) // Total count to calculate pagination pages
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError
				if (axiosError.response?.data) {
					console.error('Validation errors:', axiosError.response.data)
				}
			}
			console.error('Failed to fetch reviews:', error)
		}
	}

	useEffect(() => {
		fetchReviews(currentPage)
	}, [movie.id, currentPage])

	const totalPages = Math.ceil(totalReviews / REVIEWS_PER_PAGE)
	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNewComment(event.target.value)
	}

	const handleRatingChange = (index: number) => {
		setNewRating(index * 2)
	}

	const currentUserReview = reviews.find(r => r.user_id === auth?.user?.id)

	const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!auth.user) {
			return // Handle the case where the user is not authenticated
		}
		try {
			const reviewData = {
				user_id: auth.user.id,
				movie_id: movie.id,
				comment: newComment,
				rating: newRating,
			}
			const response = await axios.post('/reviews', reviewData)

			// Manually add the user object to the new review data
			const newReview = {
				...response.data,
				user: {
					id: auth.user.id,
					name: auth.user.name,
				},
			}

			// Update reviews state
			setReviews([newReview, ...reviews].slice(0, REVIEWS_PER_PAGE))
			setTotalReviews(prevTotal => prevTotal + 1)
			setNewComment('')
			setNewRating(0)
			// setCurrentPage(1) // Redirect to the first page to show the latest review
			// fetchReviews(1) // Re-fetch reviews to ensure the new review appears on the first page
			console.log('Review added:', newReview)
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError
				if (axiosError.response?.data) {
					console.error('Validation errors:', axiosError.response.data)
				}
			}
			console.error('Failed to post comment:', error)
		}
	}

	const handleDelete = async (reviewId: number) => {
		try {
			await axios.delete(`/reviews/${reviewId}`)
			setReviews(reviews.filter(review => review.id !== reviewId))
			setTotalReviews(prevTotal => prevTotal - 1)
			console.log('Review deleted')
			fetchReviews(currentPage) // Re-fetch reviews to update the list
		} catch (error) {
			console.error('Failed to delete review:', error)
		}
	}

	const handleDropdownToggle = (reviewId: number) => {
		setOpenReviewId(openReviewId === reviewId ? null : reviewId)
	}

	const handleEditClick = (review: Review) => {
		setEditingReviewId(review.id)
		setEditedComment(review.comment)
		setNewRating(review.rating)
		setOpenReviewId(null)
	}

	const handleCancelEdit = () => {
		setEditingReviewId(null)
		setEditedComment('')
		setNewRating(0)
	}

	const handleSaveEdit = async (reviewId: number) => {
		try {
			const response = await axios.patch(`/reviews/${reviewId}`, {
				comment: editedComment,
				rating: newRating,
				user_id: reviews.find(review => review.id === reviewId)?.user_id,
				movie_id: reviews.find(review => review.id === reviewId)?.movie_id,
			})

			const updatedReviews = reviews.map(review =>
				review.id === reviewId
					? { ...review, comment: response.data.comment, rating: response.data.rating }
					: review
			)
			setReviews(updatedReviews)
			setEditingReviewId(null)
			// fetchReviews(currentPage) // Re-fetch reviews to ensure updated data is displayed
			console.log('Review updated:', response.data)
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError
				if (axiosError.response?.data) {
					console.error('Validation errors:', axiosError.response.data)
				}
			}
			console.error('Failed to update review:', error)
		}
	}

	const renderReviews = () => (
		<div className='container mx-auto px-4 py-16'>
			<h3 className='text-2xl font-semibold text-white'>Reviews</h3>
			<div className='mt-4 space-y-4'>
				{reviews.map(review => (
					<div key={review.id} className='rounded-lg bg-gray-800 p-4'>
						<div className='flex items-center space-x-4'>
							<div>
								{review.user && (
									<Fragment>
										<span className='text-lg font-semibold text-white'>{review.user.name}</span>
										<span className='ml-4 text-gray-400'>
											{new Date(review.created_at).toLocaleDateString()}
										</span>
									</Fragment>
								)}
							</div>
							{auth.user?.id === review.user_id && (
								<div className='relative ml-auto'>
									<button
										className='flex items-center text-gray-400 hover:text-gray-600 focus:outline-none'
										onClick={() => handleDropdownToggle(review.id)}>
										<DotsVerticalIcon className='h-5 w-5' />
									</button>

									{openReviewId === review.id && (
										<div className='absolute left-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg dark:bg-gray-900'>
											<div className='py-1'>
												<button
													className='block w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-gray-400'
													onClick={() => handleEditClick(review)}>
													Edit
												</button>
												<button
													className='block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-gray-400'
													onClick={() => {
														handleDelete(review.id)
														setOpenReviewId(null)
													}}>
													Delete
												</button>
											</div>
										</div>
									)}
								</div>
							)}
						</div>

						{editingReviewId === review.id ? (
							<Fragment>
								<div className='mb-3 flex items-center'>
									{[1, 2, 3, 4, 5].map(index => (
										<svg
											key={index}
											onClick={() => handleRatingChange(index)}
											className={`h-6 w-6 cursor-pointer ${index * 2 <= newRating ? 'text-orange-500' : 'text-gray-400'}`}
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'>
											<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.971 4.162-.016c.969-.004 1.37 1.24.588 1.81l-3.319 2.428 1.24 3.84c.303.935-.755 1.711-1.548 1.118l-3.362-2.512-3.362 2.512c-.793.593-1.85-.183-1.548-1.118l1.24-3.84-3.319-2.428c-.781-.57-.38-1.814.588-1.81l4.162.016 1.286-3.971z' />
										</svg>
									))}
								</div>
								<div className='mb-4 mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700'>
									<textarea
										value={editedComment}
										onChange={e => setEditedComment(e.target.value)}
										className='w-full rounded-lg border-0 bg-gray-800 text-white dark:bg-gray-900 dark:text-white dark:placeholder-gray-400'
										rows={3}></textarea>
								</div>

								<div className='mt-2 flex justify-end space-x-4'>
									<button
										className='inline-flex items-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900'
										onClick={() => handleSaveEdit(review.id)}>
										Save
									</button>
									<button
										className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
										onClick={handleCancelEdit}>
										Cancel
									</button>
								</div>
							</Fragment>
						) : (
							<Fragment>
								<p className='mt-2 text-white'>{review.comment}</p>
								<p className='text-yellow-400'>Rating: {review.rating}</p>
							</Fragment>
						)}
					</div>
				))}
			</div>
			<div className='pagination my-4 flex items-center justify-center'>
				{[...Array(totalPages)].map((_, index) => (
					<button
						key={index + 1}
						onClick={() => handlePageChange(index + 1)}
						className={`p-2 ${currentPage === index + 1 ? 'text-blue-500' : 'text-gray-500'}`}>
						{index + 1}
					</button>
				))}
			</div>
		</div>
	)

	return auth.user ? (
		<AuthenticatedLayout user={auth.user}>
			<div className='movie-info border-b border-gray-800'>
				<div className='container mx-auto flex flex-col px-4 py-16 md:flex-row'>
					<div className='flex-none'>
						<img src={movie.image_url} alt='poster' className='w-64 lg:w-96' />
					</div>
					<div className='md:ml-24'>
						<h2 className='mt-4 text-4xl font-semibold text-zinc-50 md:mt-0'>{movie.title}</h2>
						<div className='mr-2 flex flex-wrap items-center text-sm text-gray-400'>
							<span className='ml-1 mr-1'>You rated {currentUserReview?.rating}</span>
							<svg className='w-4 fill-current text-orange-500' viewBox='0 0 24 24'>
								<g data-name='Layer 2'>
									<path
										d='M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z'
										data-name='star'></path>
								</g>
							</svg>
							<span className='mx-2'>|</span>
							<span>{movie.release_date}</span>
							<span className='mx-2'>|</span>
							<span>{movie.genre}</span>
						</div>
						<p className='mb-8 mt-8 text-gray-300'>{movie.description}</p>
						<div className='mt-3'>
							<form onSubmit={handleCommentSubmit}>
								<div className='mb-3 flex items-center'>
									{[1, 2, 3, 4, 5].map(index => (
										<svg
											key={index}
											onClick={() => handleRatingChange(index)}
											className={`h-6 w-6 cursor-pointer ${index * 2 <= newRating ? 'text-orange-500' : 'text-gray-400'}`}
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'>
											<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.971 4.162-.016c.969-.004 1.37 1.24.588 1.81l-3.319 2.428 1.24 3.84c.303.935-.755 1.711-1.548 1.118l-3.362-2.512-3.362 2.512c-.793.593-1.85-.183-1.548-1.118l1.24-3.84-3.319-2.428c-.781-.57-.38-1.814.588-1.81l4.162.016 1.286-3.971z' />
										</svg>
									))}
								</div>
								<div className='mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700'>
									<div className='rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800'>
										<textarea
											value={newComment}
											onChange={handleCommentChange}
											className='w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400'
											placeholder='Write a comment...'
											required></textarea>
									</div>
									<div className='flex items-center justify-between border-t px-3 py-2 dark:border-gray-600'>
										<button
											type='submit'
											className='inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900'>
											Post comment
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				{renderReviews()}
			</div>
		</AuthenticatedLayout>
	) : (
		<Guest>
			<div className='movie-info border-b border-gray-800'>
				<div className='container mx-auto flex flex-col px-4 py-16 md:flex-row'>
					<div className='flex-none'>
						<img src={movie.image_url} alt='poster' className='w-64 lg:w-96' />
					</div>
					<div className='md:ml-24'>
						<h2 className='mt-4 text-4xl font-semibold text-zinc-50 md:mt-0'>{movie.title}</h2>
						<div className='mr-2 flex flex-wrap items-center text-sm text-gray-400'>
							<span className='ml-1 mr-1'>You rated {currentUserReview?.rating}</span>
							<svg className='w-4 fill-current text-orange-500' viewBox='0 0 24 24'>
								<g data-name='Layer 2'>
									<path
										d='M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z'
										data-name='star'></path>
								</g>
							</svg>
							<span className='mx-2'>|</span>
							<span>{movie.release_date}</span>
							<span className='mx-2'>|</span>
							<span>{movie.genre}</span>
						</div>
						<p className='mb-8 mt-8 text-gray-300'>{movie.description}</p>
						<div className='mt-3'>
							<form method='GET' action={route('login')} noValidate>
								<div className='mb-3 flex items-center'>
									{[1, 2, 3, 4, 5].map(index => (
										<svg
											key={index}
											onClick={() => handleRatingChange(index)}
											className={`h-6 w-6 cursor-pointer ${index * 2 <= newRating ? 'text-orange-500' : 'text-gray-400'}`}
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'>
											<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.971 4.162-.016c.969-.004 1.37 1.24.588 1.81l-3.319 2.428 1.24 3.84c.303.935-.755 1.711-1.548 1.118l-3.362-2.512-3.362 2.512c-.793.593-1.85-.183-1.548-1.118l1.24-3.84-3.319-2.428c-.781-.57-.38-1.814.588-1.81l4.162.016 1.286-3.971z' />
										</svg>
									))}
								</div>
								<div className='mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700'>
									<div className='rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800'>
										<textarea
											value={newComment}
											onChange={handleCommentChange}
											className='w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400'
											placeholder='Write a comment...'
											required></textarea>
									</div>
									<div className='flex items-center justify-between border-t px-3 py-2 dark:border-gray-600'>
										<button
											type='submit'
											className='inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900'>
											Login to post comment
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				{renderReviews()}
			</div>
		</Guest>
	)
}

export default MovieDetail
