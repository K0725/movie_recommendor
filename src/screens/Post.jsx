import React from 'react';
import './Post.css';

function Post({ id, title, rating, comments, handleDelete }) {
  return (
    <div className="post">
      <h2>{title}</h2>
      <p>Rating: {rating}</p>
      <p>Comments: {comments}</p>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}

export default Post;