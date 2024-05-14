// MainSection.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../PostCard/PostCard';
import styles from './MainSection.module.css';
import { fetchSubredditPosts } from '../../slices/postsSlice'; // Import fetchSubredditPosts

function MainSection() {
  const dispatch = useDispatch();
  const { postsBySubreddit, isLoading, error } = useSelector((state) => state.posts);
  const posts = postsBySubreddit['r/popular'] || []; // Fetch posts for the front page

  useEffect(() => {
      dispatch(fetchSubredditPosts('r/popular'));
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className={styles.mainSection}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}

export default MainSection;
