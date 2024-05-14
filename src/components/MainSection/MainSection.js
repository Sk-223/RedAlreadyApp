// MainSection.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../PostCard/PostCard';
import styles from './MainSection.module.css';
import { fetchSubredditPosts } from '../../slices/postsSlice';

function MainSection() {
  const dispatch = useDispatch();
  const { postsBySubreddit, isLoading, error } = useSelector((state) => state.posts);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  useEffect(() => {
    dispatch(fetchSubredditPosts('popular')); // Fetch posts from the 'r/popular' subreddit
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const posts = postsBySubreddit['popular'] || [];

  // Filter posts based on search term (case-insensitive)
  const filteredPosts = searchTerm
  ? posts.filter(post => {
      const searchTermLower = searchTerm.toLowerCase();
      const titleLower = post.title.toLowerCase();
      const contentLower = post.selftext ? post.selftext.toLowerCase() : ''; 
      return titleLower.includes(searchTermLower) ||
             contentLower.includes(searchTermLower) ||
             post.subreddit.toLowerCase().includes(searchTermLower) ||
             post.username.toLowerCase().includes(searchTermLower);
    })
  : posts;

  return (
    <main className={styles.mainSection}>
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} /> // Pass entire post object
      ))}
    </main>
  );
}

export default MainSection;
