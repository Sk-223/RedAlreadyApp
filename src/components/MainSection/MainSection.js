// MainSection.js
import React, { useEffect } from 'react'; // Import useEffect
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../PostCard/PostCard';
import styles from './MainSection.module.css';
import { setPosts } from '../../slices/postsSlice';
import { postsSlice } from '../../slices/postsSlice';

function MainSection() {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load initial posts from postsSlice
    dispatch(setPosts(postsSlice.getInitialState().posts)); 
  }, [dispatch]);

  return (
    <main className={styles.mainSection}>
      {posts.map((post) => (
        <PostCard key={post.id} postId={post.id} />
      ))}
    </main>
  );
}

export default MainSection;
