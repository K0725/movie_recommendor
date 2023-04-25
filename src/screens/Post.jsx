import React from 'react';

function Post({  id, title, rating, comments, time, handleDelete }) {
  const formattedTime = new Date(time).toLocaleString();

  return (
    <div className="Post" style={{ border: '1px solid black', padding: '16px', marginBottom: '8px' }}>
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
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}

export default Post;