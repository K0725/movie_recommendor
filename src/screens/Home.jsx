import { useState, useEffect } from 'react';
import Card from '../components/Card';
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
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        throw error;
      }
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
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
            placeholder="Search for a post by title"
          />
          <button type="submit">Search</button>
        </form>
        {sortedPosts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            imgSrc={post.image}
            description={post.comment}
            genres={`Rating: ${post.rating}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;


