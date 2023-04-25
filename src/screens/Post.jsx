import React from 'react';
import './Post.css'
import { Link } from'react-router-dom';

function Post({  id, title, rating, comments, time, upvotes, handleDelete, handleUpvote }) {
  const formattedTime = new Date(time).toLocaleString();

  return (
    <div className="Post">
      <div className="post-controls">
        <button onClick={() => handleUpvote(id) }>Upvote</button>
        <Link to={`/edit/${id}`}>
          <button>...</button> 
        </Link>
      </div>
      <h3>{title}</h3>
      <p>
        <strong>Rating:</strong> {rating}
      </p>
      <p>
        <strong>Posted:</strong> {formattedTime}
      </p>
      <p>
        <strong>Comments:</strong> {comments}
      </p>
      <p>
        <strong>Upvotes:</strong> {upvotes}
      </p>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}

export default Post;

