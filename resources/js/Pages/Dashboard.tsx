import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { InertiaLink } from '@inertiajs/inertia-react'
import { PageProps } from '@/types'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from '@inertiajs/react'

interface Movie {
	id: number
	title: string
	description: string
	release_date: string
	image_url: string
	rating: number
	genre?: string[]
}

export default function Dashboard({ auth }: PageProps) {
	const [movies, setMovies] = useState<Movie[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await axios.get('/movies') // Endpoint to fetch movies from your Laravel backend
				setMovies(response.data)
				setLoading(false)
			} catch (error) {
				console.error('There was an error fetching the movies!', error)
				setLoading(false)
			}
		}

		fetchMovies()
	}, [])

	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title='Dashboard' />
			<div className='container mx-auto px-4 pt-16'>
				<div className='popular-movies'>
					<h2 className='text-lg font-semibold uppercase tracking-wider text-orange-500'>
						Top Pick Movies
					</h2>
					<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
						{loading ? (
							<div>Loading...</div>
						) : (
							movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
						)}
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}

interface MovieCardProps {
	movie: Movie
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
	const truncateDescription = (description: string) => {
		const words = description.split(' ')
		if (words.length > 10) {
			return words.slice(0, 10).join(' ') + '...'
		}
		return description
	}
	return (
		<div className='mt-8'>
			<Link href={`/movies/${movie.id}`}>
				<img
					src={movie.image_url}
					alt='poster'
					className='transition duration-150 ease-in-out hover:opacity-75'
				/>
			</Link>
			<div className='mt-2'>
				<Link
					href={`/movies/${movie.id}`}
					className='mt-2 text-lg font-extrabold text-zinc-50 hover:text-gray-300'>
					{movie.title}
				</Link>
				<p className='text-gray-300'>{truncateDescription(movie.description)}</p>
				<div className='mt-1 flex items-center text-sm text-gray-400'>
					<svg className='w-4 fill-current text-orange-500' viewBox='0 0 24 24'>
						<path
							d='M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z'
							data-name='star'
						/>
					</svg>
					<span className='ml-1'>{movie.rating}</span>
					<span className='mx-2'>|</span>
					<span className='mx-2'>{movie.release_date}</span>
				</div>
				<div className='text-sm text-gray-400'>{movie.genre}</div>
			</div>
		</div>
	)
}
