import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://clonesaw-server.onrender.com/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading post...</p>;
  }

  if (!post) {
    return <h2 className="text-center text-2xl font-bold">Post not found.</h2>;
  }

  return (
    <article className="max-w-3xl mx-auto px-32 py-52">
      <Link to="/blogs" className="text-black font-semibold hover:underline mb-8 inline-block">&larr; Back to all posts</Link>
      <h1 className="text-5xl font-bold tracking-tighter mb-4">{post.title}</h1>
      <p className="text-md text-gray-500 mb-8">
        By {post.author} on {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
      </p>
      
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-20 h-auto object-cover rounded-lg mb-8" />}

      <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
};

export default BlogPost;