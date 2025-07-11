'use client';

import * as BlogData from "@/blogs"
import Navbar from "@/components/Navbar";
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function IndividualBlogPage() {
	const params = useParams()
	const name = params.name as string

	const currentBlog = (BlogData.default as Record<string, typeof BlogData.default[keyof typeof BlogData.default]>)[name]

	const formatOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

	return (
		<main>
			<Navbar navbarRef={null} aboutRef={null} projectsRef={null} />
			<article className="bg-stone-950 w-1/2 mx-auto rounded-2xl max-w-4xl px-6 py-8">
				<header className="mb-8 ">
					<h1 className="text-4xl font-bold text-gray-200 mb-4">
						{currentBlog.title}
					</h1>
					<div className="flex items-center text-gray-300 mb-6">
						<span>Published: {new Intl.DateTimeFormat('en-US', formatOptions).format(currentBlog.publishedAt)} {currentBlog.updatedAt != null ? "• Updated: " + new Intl.DateTimeFormat('en-US', formatOptions).format(currentBlog.updatedAt) : ""}</span>
						<span className="mx-2">•</span>
						<span>{currentBlog.readTime} read</span>
					</div>
					<Image 
						src="/images/blogs/nctsa.png" 
						alt="North Carolina TSA App" 
						width={800}
						height={256}
						className="w-full h-96 object-cover rounded-lg shadow-lg"
					/>
				</header>
				{currentBlog.component}
			</article>
		</main>
	)
}