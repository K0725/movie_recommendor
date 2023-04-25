import React, { useState } from 'react';
import { supabase } from '../client';

const CreatePost = ({ fetchPosts }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error, status } = await supabase
        .from('movie')
        .insert([
          {
            title,
            rating,
            comments: comment,
          },
        ]);

      if (status !== 201) {
        console.error('Non-201 status code:', status);
      }

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        console.error('No data received from Supabase');
        return;
      }

      setTitle('');
      setRating('');
      setComment('');

      fetchPosts();
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Movie title"
        required
      />
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating"
        min="1"
        max="10"
        required
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your comment"
        required
      ></textarea>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
