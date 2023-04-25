import { useState, useEffect } from 'react';
import Posts from './Posts';
import { supabase } from '../client';

function Home() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('createdTime');
  const [searchQuery, setSearchQuery] = useState('');

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
        
        <select value={sortBy} onChange={handleSortChange}>
          <option value="createdTime">Sort by Created Time</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Search for a post by movie title"
          />
          <button type="submit">Search</button>
        </form>
        <Posts posts={sortedPosts} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Home;
