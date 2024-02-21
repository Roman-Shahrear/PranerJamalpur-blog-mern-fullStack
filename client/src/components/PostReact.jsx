import { useEffect, useState } from 'react';
import { FaThumbsUp, FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const PostReact = ({ post, onLike, onLove }) => {
  const [loading, setLoading] = useState(true);
  const [postDetails, setPostDetails] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/${post._id}`);
        const data = await res.json();
        if (res.ok) {
          setPostDetails(data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (post && post._id) {
      getPost();
    }
  }, [post._id]);

  

  return (
    <>
      {!loading ? (
        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2 mb-4'>
          <button
            type='button'
            onClick={() => onLike(postDetails._id)}
            className={`text-gray-400 hover:text-blue-500 ${
            currentUser &&
              postDetails.likes.includes(currentUser._id) && 
                'text-blue-500'
              }`}
                  >
            <FaThumbsUp className='text-sm' />
        </button>
          <p className='text-gray-400'>
            {postDetails.numberOfLikes > 0 &&
              postDetails.numberOfLikes +
                ' ' +
                (postDetails.numberOfLikes === 1 ? 'like' : 'likes')}
          </p>
          <button
            type='button'
            onClick={() => onLove(postDetails._id)}
            className={`text-gray-400 hover:text-blue-500 ${
            currentUser &&
              postDetails.likes.includes(currentUser._id) &&
              'text-blue-500'
              }`}
                  >
            <FaHeart className='text-sm' />
          </button>
          <p className='text-gray-400'>
            {postDetails.numberOfLoves > 0 &&
              postDetails.numberOfLoves +
                ' ' +
                (postDetails.numberOfLoves === 1 ? 'love' : 'loves')}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PostReact;