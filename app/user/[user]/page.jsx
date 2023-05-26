'use client';

import IsLoading from '@/app/components/IsLoading';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { GiHeartburn } from 'react-icons/gi';

export default function User({ params }) {
	const [posts, setPosts] = useState([]);
	const [favPosts, setFavPosts] = useState([]);
	const [pageUser, setPageUser] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isCreatingPost, setIsCreatingPost] = useState(false);

	const addPostTitle = useRef();
	const addPostDescription = useRef();
	const addPostCode = useRef();
	const addPostBounty = useRef();
	const addPostDateLimit = useRef();

	const { data: session, status } = useSession();

	async function getPosts() {
		const baseUrl = 'https://korjata.vercel.app/api/posts/getAll/';
		// const baseUrl = 'http://localhost:3000/api/posts/getAll/';

		const url = baseUrl + params.user;

		const response = await fetch(url);
		const res = await response.json();

		return res.response;
	}

	async function getUser() {
		const baseUrl = 'https://korjata.vercel.app/api/users/getByName/';
		// const baseUrl = 'http://localhost:3000/api/users/getByName/';

		const url = baseUrl + params.user;

		const response = await fetch(url);
		const res = await response.json();

		console.log(res.response.length);

		if (res.response.length == 0) return [0];
		else return res.response;
	}

	async function getFavPosts() {
		const baseUrl = 'https://korjata.vercel.app/api/posts/get/';
		// const baseUrl = 'http://localhost:3000/api/posts/get/';

		const savedPosts = pageUser.savedPosts.join('-');

		const url = baseUrl + savedPosts;

		const response = await fetch(url);
		const res = await response.json();

		if (res.response.length == 0) return [0];
		else return res.response;
	}

	async function addPost() {
		const newPost = JSON.stringify({
			owner: pageUser.username,
			data: {
				title: addPostTitle.current.value,
				description: addPostDescription.current.value,
				code: addPostCode.current.value,
				bounty: addPostBounty.current.value,
				dateLimit: addPostDateLimit.current.value,
			},
		});

		const data = {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
			},
			body: newPost,
		};

		const url = 'https://korjata.vercel.app/api/posts/add';
		// const url = 'http://localhost:3000/api/posts/add';

		const response = await fetch(url, data);
		const res = await response.json();

		console.log('added post');

		return res;
	}

	async function deletePost(id) {
		const data = {
			method: 'PUT',
			header: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: id, email: session.user.email }),
		};

		const url = 'https://korjata.vercel.app/api/posts/delete';
		// const url = 'http://localhost:3000/api/posts/delete';

		const response = await fetch(url, data);

		if (session.user.email == pageUser.email) {
			setFavPosts(favPosts.filter((data) => data._id != id));
			setPosts(posts.filter((data) => data._id != id));
		}

		console.log('deleted post');
		setPosts(posts.filter((post) => post._id != id));
	}

	async function handleFavorites(post) {
		const body = JSON.stringify({
			email: session.user.email,
			id: post._id,
		});

		const data = {
			method: 'PATCH',
			header: {
				'Content-Type': 'application/json',
			},
			body: body,
		};

		const url = 'https://korjata.vercel.app/api/users/add/favoritePost';
		// const url = 'http://localhost:3000/api/users/add/favoritePost';

		const response = await fetch(url, data);
		const res = await response.json();

		if (session.user.email == pageUser.email) {
			if (favPosts.includes(post)) {
				setFavPosts(favPosts.filter((oldPost) => oldPost != post));
			} else {
				setFavPosts([...favPosts, post]);
			}
		}

		console.log('added favorite post');

		return res;
	}

	if (pageUser.length == 0) {
		getUser().then((data) => setPageUser(data[0]));
	} else {
		if (favPosts.length == 0 && pageUser.savedPosts) {
			getFavPosts().then((data) => setFavPosts(data));
		}
	}

	function formatDate(date) {
		const newDate = date.split('-');
		return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
	}

	useEffect(() => {
		getPosts().then((data) => {
			setPosts(data);
			setIsLoading(false);
		});
	}, []);

	return (
		<>
			{isLoading ? (
				<div className='flex justify-center mt-[40vh]'>
					<IsLoading />
				</div>
			) : pageUser.image ? (
				<div className='text-center'>
					{isCreatingPost && (
						<div className='bg-black/50 absolute inset-0 flex justify-center items-center'>
							<div className='bg-black z-50 border border-primary-one-300 w-[30vw]'>
								<div className='relative flex justify-center items-center p-4'>
									<h3>Criar post</h3>
									<button
										onClick={() => {
											setIsCreatingPost(false);
										}}
										className='absolute right-4'>
										X
									</button>
								</div>
								<form className='flex flex-col justify-center items-center gap-4 p-8'>
									<div className='w-full'>
										<p>Titulo</p>
										<input
											ref={addPostTitle}
											required
											className='w-full p-2 rounded-sm focus:outline-none bg-white/10'
										/>
									</div>
									<div className='w-full'>
										<p>Descrição</p>
										<input
											ref={addPostDescription}
											className='w-full p-2 rounded-sm focus:outline-none bg-white/10'
										/>
									</div>
									<div className='w-full'>
										<p>Código(url)</p>
										<input
											ref={addPostCode}
											required
											className='w-full p-2 rounded-sm focus:outline-none bg-white/10'
										/>
									</div>
									<div className='flex justify-center items-center gap-2 w-full'>
										<div className='w-full flex-auto'>
											<p>Recompensa</p>
											<input
												ref={addPostBounty}
												type='number'
												required
												className='w-full p-2 rounded-sm focus:outline-none bg-white/10'
											/>
										</div>
										<div className='w-full flex-auto'>
											<p>Data limite</p>
											<input
												ref={addPostDateLimit}
												type='date'
												required
												className='w-full p-2 rounded-sm focus:outline-none bg-white/10'
											/>
										</div>
									</div>
									<button
										onClick={(event) => {
											event.preventDefault();
											addPost()
												.then((data) => setPosts([...posts, data.response]))
												.finally(setIsCreatingPost(false));
										}}
										className='py-2 border border-primary-one-300 w-2/5'>
										Adicionar
									</button>
								</form>
							</div>
						</div>
					)}
					<div className='flex justify-center items-center gap-2 p-4'>
						<h1 className='text-4xl m-4'>{params.user}</h1>
						<div className='w-12 border border-primary-one-300 rounded-xl overflow-hidden'>
							<Image
								src={pageUser.image && pageUser.image != '' ? pageUser.image : '/placeholder.png'}
								alt='User image'
								width={1000}
								height={1000}
							/>
						</div>
					</div>
					<div className='flex items-center justify-center gap-2'>
						<h2 className='text-2xl p-4 font-bold'>Meus Posts</h2>
						{session && session.user.email == pageUser.email && (
							<button
								onClick={() => setIsCreatingPost(true)}
								className='px-4 h-1/2 rounded-xl hover:bg-primary-one-300/10 border border-primary-one-300'>
								Criar post <span className='text-primary-one-300 font-bold'>+</span>
							</button>
						)}
					</div>
					<div
						className={`${
							posts.length != 0 ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'flex'
						} justify-center items-center gap-4`}>
						{posts.length != 0 ? (
							<>
								{posts.map((post, index) => {
									return (
										<div
											className='relative flex flex-col justify-between bg-black/30 text-white border border-primary-one-300 rounded-lg p-4 h-72 gap-2'
											key={index}>
											{session && session.user.email == pageUser.email && (
												<button
													onClick={() => {
														deletePost(post._id);
													}}
													className='absolute top-4 left-4 origin-center transition hover:scale-105 hover:text-primary-one-300'>
													<HiOutlineTrash className='absolute' size={20} />
												</button>
											)}

											<button
												onClick={() => handleFavorites(post)}
												className='absolute top-4 right-4 origin-center transition hover:scale-105 hover:text-primary-one-300'>
												<GiHeartburn size={20} />
											</button>
											<h2 className='text-2xl font-semibold'>{post.data.title}</h2>
											<h3>{post.data.description}</h3>
											<h3>{post.data.code}</h3>
											<h3>{post.data.bounty}</h3>
											<h3>{formatDate(post.data.dateLimit)}</h3>
										</div>
									);
								})}
							</>
						) : (
							<h3 className='text-center w-full'>Nenhum Post ainda. :(</h3>
						)}
					</div>
					<h2 className='text-2xl p-4 font-bold'>Meus Posts Favoritos</h2>
					<div className='py-8'>
						{favPosts.length != 0 ? (
							<div className='grid grid-cols-3 items-center gap-4'>
								{favPosts.map((post, index) => {
									return (
										<div
											className='flex flex-col justify-between bg-black/30 text-white border border-primary-one-300 rounded-lg p-4 h-72 gap-2'
											key={index}>
											<h2 className='text-2xl font-semibold'>{post.data.title}</h2>
											<h3>{post.data.description}</h3>
											<h3>{post.data.code}</h3>
											<h3>{post.data.bounty}</h3>
											<h3>{formatDate(post.data.dateLimit)}</h3>
											<h4>
												by <a href={`/user/${post.owner}`}>{post.owner}</a>
											</h4>
										</div>
									);
								})}
							</div>
						) : (
							<h3>Nenhum Post Favorito ainda. :(</h3>
						)}
					</div>
				</div>
			) : (
				<div className='flex justify-center items-center mt-[40vh] text-4xl'>
					<h2>Usuario não encontrado</h2>
				</div>
			)}
		</>
	);
}
