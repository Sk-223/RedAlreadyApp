import React from 'react';
import styles from './Comment.module.css';

function Comment({ comment }) { 
  return (
    <div className={styles.comment}>
      <p>
        <strong>{comment.author}:</strong> {comment.body}
      </p>
    </div>
  );
}

export default Comment;
