
import Post from '../screens/Post';

function Posts({ posts, handleDelete, handleUpvote }) {
  return (
    <div className="Posts">
      {posts.map((post, index) => (
        <Post
          key={`${post.id}-${index}`} 
          id={post.id}
          title={post.title}
          rating={post.rating}
          comments={post.comments}
          time={post.time}
          upvotes={post.upvotes} // Add this line
          handleDelete={handleDelete}
          handleUpvote={handleUpvote} // Add this line
        />
      ))}
    </div>
  );
}

export default Posts;