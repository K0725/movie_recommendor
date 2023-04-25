import React from 'react';
import './Post.css'

function Post({  id, title, rating, comments, time, upvotes, handleDelete, handleUpvote }) {
  const formattedTime = new Date(time).toLocaleString();

  return (
    <div className="Post">
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
      <button onClick={() => handleUpvote(id)}>Upvote</button>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}

export default Post;
