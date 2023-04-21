import {useState, useEffect} from 'react';
import {supabase} from '../client';
import Card from '../components/Card'

function Posts(){
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [posts, setPosts] = useState([]);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
    

    const { data, error } = await supabase.from('reviews').insert([
        { title, rating, comment },
    ]);
  };

    useEffect(() => {
      fetchPosts();
    }, []);

    const fetchPosts = async () => {
      let { data: posts, error } = await supabase.from('reviews').select('*')
      setPosts(posts)
    }

  return (
    <div>
      <h1>Post a Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Movie Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Rating:
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <br />
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            rating={post.rating}
            comment={post.comment}
          />
        ))}
      </div>
    </div>
  );
}

export default Posts;