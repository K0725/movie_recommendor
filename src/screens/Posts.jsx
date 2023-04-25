import { useState, useEffect } from 'react';
import { supabase } from '../client';
import Post from './Post';

function Posts({ posts, handleDelete }) {
  // Remove the state and useEffect from here

  return (
    <div className="Posts">
      {posts.map((post) => (
        <Post
          key={post.id}
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