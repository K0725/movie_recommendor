import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const { data, error, status } = await supabase.from('movie').select('*').eq('id', id).single();

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

      setMovie(data);
      setRating(data.rating);
      setComments(data.comments);
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('movie')
        .update({ rating, comments })
        .eq('id', id);

      if (error) {
        throw error;
      }

      navigate('/');
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Edit">
      <h1>Edit Movie</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <br />
        <label htmlFor="comments">Comments:</label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Edit;
