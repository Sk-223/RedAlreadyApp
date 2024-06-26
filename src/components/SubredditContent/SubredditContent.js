import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../PostCard/PostCard';
import styles from './SubredditContent.module.css';
import { fetchSubredditPosts } from '../../slices/postsSlice';

function SubredditContent() {
  const { subreddit } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { postsBySubreddit, isLoading, error } = useSelector((state) => state.posts);
  const posts = postsBySubreddit[subreddit] || [];

  useEffect(() => {
      dispatch(fetchSubredditPosts(subreddit));
  }, [subreddit, dispatch]);

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

// If no posts, display message or navigate
if (!isLoading && !error && posts.length === 0) { // <-- Check for isLoading and error here
  return (
    <div>
        <p>No posts found for r/{subreddit}.</p>
        <button onClick={() => navigate(-1)}>Go Back</button> 
    </div>
  );
}

  // Render posts if available
  return (
    <div className={styles.subredditContent} data-testid="subreddit-content">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default SubredditContent;
