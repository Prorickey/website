'use client';

import Navbar from "@/components/Navbar";
import * as BlogData from "@/blogs"
import Image from "next/image";

const featuredBlog = BlogData.default.NCTSAApp

export default function BlogPage() {

    const formatOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return (
        <main>
            <Navbar navbarRef={null} aboutRef={null} projectsRef={null} />
            <p className="mx-10 text-3xl mb-4 font-semibold">Featured Blog</p>
            <div className="flex flex-row mx-10">
                <div className="w-full content-background rounded-2xl pb-4 cursor-pointer" onClick={() => window.location.href = `/blog/${featuredBlog.name}`}>
                    <Image 
                        src={featuredBlog.image} 
                        alt={featuredBlog.title} 
                        className="rounded-t-2xl w-full object-cover"
                        width={600} 
                        height={400} />

                    <div className="h-[2px] bg-[#db4c4c]"></div>

                    <p className="mx-4 mt-2 text-3xl font-semibold">{featuredBlog.title}</p>
                    <p className="mx-4 mt-2 text-stone-300">{featuredBlog.description}</p>
                    <p className="mx-4 mt-4 text-sm text-stone-400">Published: {new Intl.DateTimeFormat('en-US', formatOptions).format(featuredBlog.publishedAt)} {featuredBlog.updatedAt != null ? "• Updated: " + new Intl.DateTimeFormat('en-US', formatOptions).format(featuredBlog.updatedAt) : ""}</p>
                </div>
                <div className="w-full"></div>
                <div className="w-full"></div>
            </div>
        </main>
    )
}