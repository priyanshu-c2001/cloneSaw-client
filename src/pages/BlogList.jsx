import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import Modal from '../components/Modal';

const LoginForm = ({ onLoginSuccess, onCancel }) => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(
        "https://clonesaw-server.onrender.com/admin/login",
        { emailId, password },
        { withCredentials: true }
      );
      onLoginSuccess(); 
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
      <div>
        <label htmlFor="emailId" className="block text-sm font-semibold text-gray-700">Email</label>
        <input type="text" id="emailId" value={emailId} onChange={(e) => setEmailId(e.target.value)} required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black" />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex items-center gap-4">
        <button type="submit" className="py-2 px-6 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-gray-800 font-semibold transition-colors">Login</button>
        <button type="button" onClick={onCancel} className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 font-semibold transition-colors">Cancel</button>
      </div>
    </form>
  );
};

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    navigate('/admin');
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading posts...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-52">
      <header className="flex justify-between items-center border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-4xl font-bold tracking-tighter">The Blogs</h1>
        <button onClick={() => setIsLoginModalOpen(true)} className="py-2 px-5 border border-black rounded-md font-semibold hover:bg-black hover:text-white transition-colors">
          Admin Login
        </button>
      </header>

      <main className="space-y-12">
        {posts.map(post => (
          <article key={post._id}>
            <h2 className="text-3xl font-bold text-gray-900 hover:text-gray-600 transition-colors">
              <Link to={`/blogs/${post._id}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-gray-500 my-2">
              By {post.author} on {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {post.content.substring(0, 250)}...
            </p>
          </article>
        ))}
      </main>

      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <LoginForm onLoginSuccess={handleLoginSuccess} onCancel={() => setIsLoginModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default BlogList;