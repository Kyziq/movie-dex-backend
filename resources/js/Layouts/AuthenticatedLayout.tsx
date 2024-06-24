import React, { useState, PropsWithChildren, ReactNode } from 'react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import Dropdown from '@/Components/Dropdown'
import NavLink from '@/Components/NavLink'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import { Link } from '@inertiajs/react'
import { User } from '@/types'
import axios from 'axios'

interface Movie {
	id: number
	title: string
	description: string
	release_date: string
	image_url: string
	genre?: string[]
}

export default function Authenticated({
	user,
	header,
	children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
	const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)
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
								<Dropdown>
									<Dropdown.Trigger>
										<span className='inline-flex rounded-md'>
											<button
												type='button'
												className='inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-950 dark:text-gray-400 dark:hover:text-gray-300'>
												{user.name}
												<svg
													className='-mr-0.5 ml-2 h-4 w-4'
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 20 20'
													fill='currentColor'>
													<path
														fillRule='evenodd'
														d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
														clipRule='evenodd'
													/>
												</svg>
											</button>
										</span>
									</Dropdown.Trigger>

									<Dropdown.Content>
										<Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
										<Dropdown.Link href={route('logout')} method='post' as='button'>
											Log Out
										</Dropdown.Link>
									</Dropdown.Content>
								</Dropdown>
							</div>
						</div>

						<div className='-mr-2 flex items-center sm:hidden'>
							<button
								onClick={() => setShowingNavigationDropdown(previousState => !previousState)}
								className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400'>
								<svg className='h-6 w-6' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
									<path
										className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M4 6h16M4 12h16M4 18h16'
									/>
									<path
										className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				<div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
					<div className='space-y-1 pb-3 pt-2'>
						<ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
							Dashboard
						</ResponsiveNavLink>
					</div>

					<div className='border-t border-gray-200 pb-1 pt-4 dark:border-gray-600'>
						<div className='px-4'>
							<div className='text-base font-medium text-gray-800 dark:text-gray-200'>
								{user.name}
							</div>
							<div className='text-sm font-medium text-gray-500'>{user.email}</div>
						</div>

						<div className='mt-3 space-y-1'>
							<ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
							<ResponsiveNavLink method='post' href={route('logout')} as='button'>
								Log Out
							</ResponsiveNavLink>
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
