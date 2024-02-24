import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CallToAction from '../components/CallToAction';
import PostCards from '../components/PostCards';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to প্রাণের জামালপুর Blog </h1>
        <p className='text-gray-500 font-bold text-xl sm:text-sm'>
          You can get all updates of Jamalpur district by following the site's posts or media related information.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCards key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='font-bold text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
