import { Table, TableBody, TableCell, TableRow, Modal, Button, Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const isAdmin = currentUser?.isAdmin || false;
                if (currentUser && isAdmin) {
                    const url = isAdmin
                        ? "/api/post/getposts"
                        : `/api/post/getposts?userId=${currentUser._id}`;
                    const res = await fetch(url);
                    const data = await res.json();
                    if (res.ok) {
                        setUserPosts(data.posts);
                        if(data.posts.length < 9){
                            setShowMore(false);
                        }
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
          const res = await fetch(
            `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
          );
          const data = await res.json();
          if (res.ok) {
            setUserPosts((prev) => [...prev, ...data.posts]);
            if (data.posts.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    
      const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}`, {
                method: 'DELETE',
            });
    
            if (!res.ok) {
                const data = await res.json();
                console.error('Error deleting post:', data.error);
            } else {
                setUserPosts((prev) =>
                    prev.filter((post) => post._id !== postIdToDelete)
                );
            }
        } catch (error) {
            console.error('Error deleting post:', error.message);
        }
    };

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <Table.Head>
                            <Table.HeadCell>Date updated</Table.HeadCell>
                            <Table.HeadCell>Post Image</Table.HeadCell>
                            <Table.HeadCell>Post Video</Table.HeadCell>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <TableBody className="divide-y">
                            {userPosts.map((post) => (
                                <TableRow key={post._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell>
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img src={post.image} alt={post.title}
                                            className="w-20 h-10 object-cover bg-gray-500"/>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/post/${post.slug}`}>
                                        <video width="250" height="150" controls className="w-20 h-10">
                                                <source src={post.vedio}  type="video/mp4" />
                                            </video>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{post.category}</TableCell>
                                    <TableCell>
                                        <span onClick={()=>{
                                            setShowModal(true);
                                            setPostIdToDelete(post._id);
                                        }} className="font-medium text-red-500 hover:underline cursor-pointer">
                                            Delete
                                        </span></TableCell>
                                    <TableCell>
                                        <Link className="font-medium text-green-500 hover:text-yellow-500" to={`/update-post/${post._id}`}>
                                            <span>Edit</span>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {
                        showMore && (
                            <button onClick={handleShowMore} className="w-full font-medium text-green-600 self-center text-sm py-7">Show more</button>
                        )
                    }
                </>
            ) : (
                <p>You have no posts yet</p>
            )}
            {!currentUser.isAdmin && (
            <Alert color="failure">
              <p>You have no permission yet, to see All posts</p>
            </Alert>
            
          )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                <div className='text-center'>
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                        Are you sure you want to delete this post?
                    </h3>
                    <div className='flex justify-center gap-4'>
                    <Button color='failure' onClick={handleDeletePost}>
                        Yes, I'm sure
                    </Button>
                    <Button color='gray' onClick={() => setShowModal(false)}>
                        No, cancel
                    </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}