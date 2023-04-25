import { useState, useEffect } from 'react';
import { supabase } from '../client';
import Post from './Post';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error, status } = await supabase.from('movie').select('*');
  
      if (status !== 200) {
        console.error('Non-200 status code:', status);
      }
  
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
  
      if (!data) {
        console.error('No data received from Supabase');
        return;
      }
  
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('movie').delete().eq('id', id);
      if (error) throw error;
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="Posts">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          rating={post.rating}
          comments={post.comments}
          // category={post.category} // Add category prop
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default Posts;