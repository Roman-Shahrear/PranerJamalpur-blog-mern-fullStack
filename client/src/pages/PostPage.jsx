import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCards from "../components/PostCards";
import PostReact from "../components/PostReact";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    
    
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

    useEffect(() => {
        try {
          const fetchRecentPosts = async () => {
            const res = await fetch(`/api/post/getposts?limit=6`);
            const data = await res.json();
            if (res.ok) {
              setRecentPosts(data.posts);
            }
          };
          fetchRecentPosts();
        } catch (error) {
          console.log(error.message);
        }
      }, []);
    
      const handleLike = async () => {
        try {
          if (!currentUser) {
            navigate('/sign-in');
            return;
          }
      
          const response = await fetch(`/api/post/likepost/${post._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            const updatedPost = await response.json();
            setPost(updatedPost);
          } else {
            console.error('Failed to like the post');
          }
        } catch (error) {
          console.error('Error handling like:', error);
        }
      };
      
      const handleLove = async () => {
        try {
          if (!currentUser) {
            navigate('/sign-in');
            return;
          }
      
          const response = await fetch(`/api/post/lovepost/${post._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            const updatedPost = await response.json();
            setPost(updatedPost);
          } else {
            console.error('Failed to love the post');
          }
        } catch (error) {
          console.error('Error handling love:', error);
        }
      };

    
      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <Spinner size="xl" />
          </div>
        );
      }

   
    if (error) {
      return (
          <div className="flex justify-center items-center min-h-screen">
              <p>An error occurred while fetching the post.</p>
          </div>
      );
  }

  // if (!post || typeof post !== 'object' || !post._id) {
  //   return (
  //       <div className="flex justify-center items-center min-h-screen">
  //           <p>No post found or invalid post data.</p>
  //       </div>
  //   );
  // }

    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
            <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                {post?.title}
            </h1>
            <NavLink
                to={`/search?category=${post?.category}`}
                className="self-center mt-5 text-md font-extrabold"
            >
                <Button color="gray" pill  size="sm"  gradientDuoTone="greenToBlue" outline >
                {/* gradientDuoTone="purpleToPink" */}
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
                            className="object-cover w-full h-64"
                        >
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ))}
                </div>
            )}
            <div className="flex justify-between p-3 border-b border-teal-500 mx-auto w-full max-w-2xl text-xs">
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="italic">
                    {post && post.content && (post.content.length / 1000).toFixed(0)} mins read
                </span>

            </div>
            <div
                className="p-3 max-w-2xl mx-auto w-full post-content"
                dangerouslySetInnerHTML={{ __html: post?.content }}
            >
            </div>
            {/* <div>
                <PostReact key={post._id} post={post} onLike={handleLike} onLove={handleLove}/>
            </div> */}

            {post && (
              <div>
                <PostReact key={post._id} post={post} onLike={handleLike} onLove={handleLove}/>
              </div>
            )}
            <div className='max-w-4xl mx-auto w-full'>
                <CallToAction />
            </div>
            <CommentSection postId={post._id}/>

            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='text-xl mt-5'>Recent articles</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                {recentPosts &&
                    recentPosts.map((post) => <PostCards key={post._id} post={post} />)}
                </div>
            </div>
        </main>
    );
}