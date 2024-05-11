import React from 'react';
import { useSelector } from 'react-redux';
import Comment from '../Comment/Comment';
import styles from './CommentSection.module.css';

function CommentSection({ postId }) {
  const post = useSelector((state) =>
    state.posts.posts.find((p) => p.id === postId)
  );

  return (
    <div className={styles.commentSection}> 
      <h3>Comments</h3>
      {post?.comments?.map((comment, index) => ( 
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
}

export default CommentSection;
