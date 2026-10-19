// not sure this is right, suggested solution for following error message:
// Uncaught Error: Route "/posts": `cacheTag()` can only be called inside a `"use cache"` or `"use cache: private"` function.
//Learn more: https://nextjs.org/docs/messages/cache-tag-outside-use-cache
"use cache"

import Link from "next/link"
import {sanityFetch} from "@/sanity/lib/live"
import {POSTS_QUERY} from "@/sanity/lib/queries"


const options = {next: {revalidate: 60}}

export default async function Page(){
    const { data: posts } = await sanityFetch({ query: POSTS_QUERY });

    return(
        <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
            <h1 className="text-4xl font-bold">Post Index</h1>
            <ul className="grid grid-cols-1 divide-y divide-blue-100">
                {posts.map((post) => (
                    <li key={post._id}>
                        <Link
                            className="block p-4 hover:text-blue-500"
                            href={`/posts/${post?.slug?.current}`}
                        >
                            {post?.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <hr />
            <Link href="/">&larr; Return home</Link>
        </main>
    )
}