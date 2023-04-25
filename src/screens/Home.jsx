import { useState, useEffect } from 'react';
import Posts from '../components/Posts';
import { supabase } from '../client';
import {Link} from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('createdTime');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error, status } = await supabase.from('Posts').select('*');
  
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

  const handleUpvote = async (postId) => {
    try {
      const post = posts.find((post) => post.id === postId);
      const newUpvotes = post.upvotes + 1;
  
      const { data, error } = await supabase
        .from("Posts")
        .update({ upvotes: newUpvotes })
        .eq("id", postId);
  
      if (error) {
        console.log("Error updating upvotes:", error);
        throw error;
      }
  
      setPosts(posts.map((post) => (post.id === postId ? { ...post, upvotes: newUpvotes } : post)));
    } catch (error) {
      console.log("Error handling upvote:", error.message);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('Posts').delete().eq('id', id);
      if (error) throw error;
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery === '') {
      fetchPosts();
    } else {
      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setPosts(filteredPosts);
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'createdTime') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return b.upvotes - a.upvotes;
    }
  });

  return (
    <div className="Head">
      <div>
        <h1>
          <strong>Rate This Movie 🎥🍿</strong>
        </h1>
        <br>
        </br>
        <br>
        </br>
        
        <select value={sortBy} onChange={handleSortChange}>
          <option value="createdTime">Sort by Created Time</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>
        <br>
        </br>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Search for a post by movie title"
          />
          <button type="submit">Search</button>
        </form>
        <div className="Posts">
          <Posts
            posts={sortedPosts}
            handleDelete={handleDelete}
            handleUpvote={handleUpvote}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

