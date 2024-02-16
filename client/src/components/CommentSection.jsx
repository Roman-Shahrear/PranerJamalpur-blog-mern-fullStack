import { Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function CommentSection({postId}) {
    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (comment.length > 500) {
        return;
      }
      try {
        const res = await fetch('/api/comment/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
        });
        if (!res.ok) {
          console.error('Error:', res.status, res.statusText);
        }
      
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setComment('');
        }
      } catch (error) {
        console.error('Fetch error:', error.message);
      }
    };
  
    return (
    <div className="max-w-2xl mx-auto w-full p-3">
      { currentUser ? 
      ( 
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
            <p>Signed in as:</p>
            <img className="h-5 w-5 object-cover rounded-full" src={currentUser.profilePicture} alt="" />
            <Link to="/dashboard?tab=profile"
                className="text-xs text-cyan-600 hover:underline"
            >
                @{currentUser.username}
            </Link>
        </div>
      ) :
      (
        <div className="flex gap-1 text-sm text-teal-500 my-5">
            You must be signed in to Comment.
            <Link className="text-blue-500 hover:underline" to="/sign-in">Sign In</Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
            <Textarea placeholder="Add a comment..." 
                rows="3"
                maxLength="500"    
                onChange={(e)=> setComment(e.target.value)}
                value={comment}
            />
            <div className="flex justify-between items-center mt-5">
                <p className="text-gray-500 text-xs">{500 - comment.length} characters remaining
                </p>
                <Button outline gradientDuoTone="purpleToBlue" type="submit">
                    Submit
                </Button>
            </div>
        </form>
      )}
    </div>
  )
}