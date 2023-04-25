import { useState, useEffect } from 'react';
import { supabase } from '../client';
import Post from './Post';

function Posts({ posts, handleDelete }) {
  return (
    <div className="Posts">
      {posts.map((post, index) => (
        <Post
          key={`${post.id}-${index}`} 
          id={post.id}
          title={post.title}
          rating={post.rating}
          comments={post.comments}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}



export default Posts;