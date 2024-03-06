import { useEffect, useState } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { GiRunningShoe } from "react-icons/gi";
import { useSelector } from 'react-redux';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';

const PostReact = ({ post, onLike, onLove }) => {
  const [loading, setLoading] = useState(true);
  const [postDetails, setPostDetails] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  

  useEffect(() => {
    const getPost = async () => {
      if (!post || !post._id) {
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`/api/post/${post._id}`);
        const data = await res.json();

        if (res.ok) {
          console.log('Post data:', data);
          setPostDetails(data);
        } else {
          console.error(`Failed to fetch post. Status: ${res.status}, Message: ${data.message}`);
        }
      } catch (error) {
        console.error('An error occurred while fetching the post:', error);
        setPostDetails(null);
      } finally {
        setLoading(false);
      }
    };
    if (post && post._id) {
      console.log('Fetching post details...');
      getPost();
    }
  }, [post]);


  useEffect(() => {
  }, [postDetails]);
  
  const shareUrl = postDetails ? `http://localhost:5173/post/${postDetails._id}` : null;
  console.log(shareUrl);
  return (
    <>
      {!loading ? (
        <div className='flex items-center pt-2 text-xs max-w-fit gap-2 mb-4'>
          <button
            type='button'
            onClick={() => postDetails && onLike(postDetails._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              postDetails &&
              postDetails.likes.includes(currentUser._id) &&
              'text-blue-500'
            }`}
          >
            <AiFillLike  className='text-4xl' />
          </button>

          <p className='text-gray-400'>
            {postDetails && postDetails.numberOfLikes > 0 &&
              postDetails.numberOfLikes +
                 ' '}
                  {/* +
                // (postDetails.numberOfLikes === 1 ? 'like' : 'likes')} */}
          </p>

          <button
            type='button'
            onClick={() => postDetails && onLove(postDetails._id)}
            className={`pl-5 text-gray-400 hover:text-red-500 ${
              currentUser &&
              postDetails &&
              postDetails.loves.includes(currentUser._id) &&
              'text-red-500'
            }`}
          >
              <GiRunningShoe className='text-4xl' />
          </button>

          <p className=' text-gray-400'>
            {postDetails && postDetails.numberOfLoves > 0 &&
              postDetails.numberOfLoves +
                ' ' 
                // (postDetails.numberOfLoves === 1 ? 'love' : 'loves')}
            }
          </p>

          <FacebookShareButton className='ml-5' url={shareUrl}>
           <FacebookIcon logofillcolor='white' round={true} style={{ width: '30px', height: '30px' }}>
           </FacebookIcon>
          </FacebookShareButton>

          <TwitterShareButton className='ml-5' url={shareUrl}>
            <TwitterIcon logofillcolor='white' round={true} style={{ width: '30px', height: '30px' }}>
              
            </TwitterIcon>
          </TwitterShareButton>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PostReact;