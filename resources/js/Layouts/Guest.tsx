import React, { useState, PropsWithChildren, ReactNode } from 'react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import NavLink from '@/Components/NavLink'
import { Link } from '@inertiajs/react'
import axios from 'axios'

interface Movie {
	id: number
	title: string
	description: string
	release_date: string
	image_url: string
	genre?: string[]
}

export default function Guest({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
	const [searchQuery, setSearchQuery] = useState('')
	const [searchResults, setSearchResults] = useState<Movie[]>([])

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
		if (e.target.value.length > 2) {
			performSearch(e.target.value)
		} else {
			setSearchResults([])
		}
	}

	const performSearch = async (query: string) => {
		try {
			const response = await axios.get(`/test-search?query=${encodeURIComponent(query)}`)
			setSearchResults(response.data)
		} catch (error) {
			console.error('Failed to fetch search results:', error)
		}
	}

	return (
		<div className='min-h-screen bg-gray-100 dark:bg-gray-950'>
			<nav className='border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-red-800'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='flex h-16 justify-between'>
						<div className='flex'>
							<div className='flex shrink-0 items-center'>
								<Link href='/'>
									<ApplicationLogo className='block h-9 w-auto fill-current text-gray-800 dark:text-gray-200' />
								</Link>
							</div>

							<div className='hidden space-x-8 sm:-my-px sm:ml-10 sm:flex'>
								<NavLink href={route('dashboard')} active={route().current('dashboard')}>
									Movie
								</NavLink>
							</div>
						</div>

						<div className='flex items-center'>
							<div className='relative'>
								<input
									type='text'
									className='focus:shadow-outline w-64 rounded-full bg-slate-200 px-4 py-1 pl-8 text-sm focus:outline-none dark:border-gray-700'
									placeholder='Search'
									value={searchQuery}
									onChange={handleSearchChange}
								/>
								<div className='absolute top-0'>
									<svg className='ml-2 mt-2 w-4 fill-current text-gray-500' viewBox='0 0 24 24'>
										<path d='M16.32 14.9l5.39 5.4a1 1 0 01-1.42 1.4l-5.38-5.38a8 8 0 111.41-1.41zM10 16a6 6 0 100-12 6 6 0 000 12z'></path>
									</svg>
								</div>
								{searchResults.length > 0 && (
									<div className='absolute z-10 mt-1 w-64 rounded-md bg-white shadow-lg dark:bg-gray-800'>
										<ul>
											{searchResults.map(movie => (
												<li
													key={movie.id}
													className='border-b border-gray-200 p-2 dark:border-gray-700'>
													<Link
														href={route('movies.show', { movie: movie.id })}
														className='block text-gray-700 dark:text-gray-200'>
														{movie.title}
													</Link>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>

							<div className='relative ml-3'>
								<span className='inline-flex rounded-md'>
									<form method='GET' action={route('login')}>
										<button
											type='submit'
											className='mr-3 inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-950 dark:text-zinc-50 dark:hover:text-gray-300'>
											Log in
										</button>
									</form>
									<form method='GET' action={route('register')}>
										<button
											type='submit'
											className='inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-950 dark:text-zinc-50 dark:hover:text-gray-300'>
											Register
										</button>
									</form>
								</span>
							</div>
						</div>
					</div>
				</div>
			</nav>
			{header && (
				<header className='bg-white shadow dark:bg-gray-900'>
					<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>{header}</div>
				</header>
			)}
			<main>{children}</main>
		</div>
	)
}
