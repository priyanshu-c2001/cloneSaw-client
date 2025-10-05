import { useState, useEffect } from 'react';
import axios from 'axios';

const PostForm = ({ postToEdit, onFormSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        content: '',
        imageUrl: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (postToEdit) {
            setFormData(postToEdit);
        }
    }, [postToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication error. Please log in again.');
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            let response;
            if (postToEdit) {
                response = await axios.put(
                    `https://clonesaw-server.onrender.com/admin/posts/${postToEdit._id}`,
                    formData,
                    {
                        ...config,
                        withCredentials: true
                    }
                );
            } else {
                response = await axios.post(
                    `https://clonesaw-server.onrender.com/admin/posts`,
                    formData,
                    {
                        ...config,
                        withCredentials: true
                    }
                );
            }
            onFormSubmit(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save the post.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">{postToEdit ? 'Edit Post' : 'Create New Post'}</h2>
            <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black" />
            </div>
            <div>
                <label htmlFor="author" className="block text-sm font-semibold text-gray-700">Author</label>
                <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black" />
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-semibold text-gray-700">Content</label>
                <textarea id="content" name="content" value={formData.content} onChange={handleChange} required rows="8"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"></textarea>
            </div>
            <div>
                <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700">Image URL (Optional)</label>
                <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black" />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex items-center gap-4">
                <button type="submit" className="py-2 px-6 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-gray-800 font-semibold transition-colors">
                    {postToEdit ? 'Save Changes' : 'Create Post'}
                </button>
                <button type="button" onClick={onCancel} className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 font-semibold transition-colors">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default PostForm;