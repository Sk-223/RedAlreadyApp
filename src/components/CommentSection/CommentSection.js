import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Comment from '../Comment/Comment';
import styles from './CommentSection.module.css';

function CommentSection({ postId }) {
  const post = useSelector((state) =>
    state.posts.posts.find((p) => p.id === postId)
  );

  const [displayedComments, setDisplayedComments] = useState(post?.comments.slice(0, 5) || []); // Show the first 5 comments
  const [showAllComments, setShowAllComments] = useState(false);

  const handleLoadMore = () => {
    setDisplayedComments(post.comments);
    setShowAllComments(true);
  };

  return (
    <div className={styles.commentSection}>
      <h3>Comments</h3>
      {displayedComments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}

      {!showAllComments && post?.comments.length > 5 && (
        <button onClick={handleLoadMore}>Load More Comments</button>
      )}
    </div>
  );
}

export default CommentSection;