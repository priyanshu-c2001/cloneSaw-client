import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import Modal from '../components/Modal';
import PostForm from '../components/PostForm';

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`https://clonesaw-server.onrender.com/posts`, { withCredentials: true });
                setPosts(response.data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleLogout = async () => {
        await axios.post("https://clonesaw-server.onrender.com/admin/logout", {}, { withCredentials: true });
        navigate("/blogs");
    };

    const handleOpenCreateModal = () => {
        setPostToEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (post) => {
        setPostToEdit(post);
        setIsModalOpen(true);
    };

    const handleDelete = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            const token = localStorage.getItem('token');
            try {
                await axios.delete(`https://clonesaw-server.onrender.com/admin/posts/${postId}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    withCredentials: true
                });
                setPosts(posts.filter(p => p._id !== postId));
            } catch (error) {
                console.error('Failed to delete post:', error);
                alert('Could not delete the post.');
            }
        }
    };

    const handleFormSubmit = (savedPost) => {
        if (postToEdit) {
            setPosts(posts.map(p => (p._id === savedPost._id ? savedPost : p)));
        } else {
            setPosts([savedPost, ...posts]);
        }
        setIsModalOpen(false);
    };

    if (isLoading) return <p className="text-center text-gray-500">Loading dashboard...</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-52">
            <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-200 pb-6 mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter">
                    Admin Dashboard
                </h1>
                <div className="flex gap-4">
                    <button onClick={handleOpenCreateModal} className="py-2 px-5 bg-black text-white border border-black rounded-md font-semibold hover:bg-gray-800 transition-colors">
                        Create New Post
                    </button>
                    <button onClick={handleLogout} className="py-2 px-5 border border-black rounded-md font-semibold hover:bg-black hover:text-white transition-colors">
                        Logout
                    </button>
                </div>
            </header>

            <main className="space-y-4">
                {posts.map(post => (
                    <div key={post._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                            <p className="text-xs text-gray-500">
                                Created on: {format(new Date(post.createdAt), 'PPpp')}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleOpenEditModal(post)} className="py-1 px-4 text-sm border border-gray-500 text-gray-700 rounded-md font-semibold hover:bg-gray-700 hover:text-white transition-colors">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(post._id)} className="py-1 px-4 text-sm border border-red-500 text-red-500 rounded-md font-semibold hover:bg-red-500 hover:text-white transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </main>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <PostForm postToEdit={postToEdit} onFormSubmit={handleFormSubmit} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default AdminDashboard;