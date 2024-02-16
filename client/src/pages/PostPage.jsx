import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                } else {
                    setPost(data.posts[0]);
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postSlug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="text-center mt-10">
                <p>An error occurred while fetching the post.</p>
            </div>
        );
    }

    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
            <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                {post?.title}
            </h1>
            <NavLink
                to={`/search?category=${post?.category}`}
                className="self-center mt-5 text-md font-extrabold"
            >
                <Button color="gray" pill  size="sm" gradientDuoTone="purpleToPink" outline >
                    {post?.category}
                </Button>
            </NavLink>
            {post?.image && post.image.length > 0 && (
                <div className="mt-10 p-3 w-full flex flex-wrap gap-4">
                    {post.image.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`image-${index}`}
                            className="object-cover w-full"
                        />
                    ))}
                </div>
            )}
            {post?.video && post.video.length > 0 && (
                <div className="mt-10 p-3 w-full flex flex-wrap gap-4">
                    {post.video.map((videoUrl, index) => (
                        <video
                            key={index}
                            controls
                            className="object-cover w-full"
                        >
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ))}
                </div>
            )}
            <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="italic">
                    {post && (post.content.length / 1000).toFixed(0)} mins read
                </span>
            </div>
            <div
                className="p-3 max-w-2xl mx-auto w-full post-content"
                dangerouslySetInnerHTML={{ __html: post?.content }}
            >

            </div>
            <div className='max-w-4xl mx-auto w-full'>
                <CallToAction />
            </div>
            <CommentSection postId={post._id}/>
        </main>
    );
}