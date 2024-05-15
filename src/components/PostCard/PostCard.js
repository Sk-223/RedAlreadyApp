import React, { useState } from 'react';
import styles from './PostCard.module.css';
import createEmbedURL from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { upvotePost, downvotePost } from '../../slices/postsSlice';
import CommentSection from '../CommentSection/CommentSection';

function PostCard({ post }) {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);

  const handleUpvote = () => {
    dispatch(upvotePost({ postId: post.id, subreddit: post.subreddit }));
  };

  const handleDownvote = () => {
    dispatch(downvotePost({ postId: post.id, subreddit: post.subreddit }));
  };
  
  if(!post) {
    return <div>Loading...</div>
  }

  return (
    <article className={styles.postCard}>
      <h3>{post.title}</h3> 
      <div className={styles.postContent}> 
        {(post.type === 'text') ? <p>{post.content}</p> : null}
        {(post.type === 'image') ? <img src={post.imageUrl} alt={post.title} /> : null}
        {(post.type === 'video' && post.videoUrl) && ( 
          <div className={styles.videoContainer}>
            <iframe 
              width="420" 
              height="315"
              src={createEmbedURL(post.videoUrl)} 
              title="Embedded Video" 
              allowFullScreen 
            />
          </div>
        )}
      </div>
      <div className={styles.postMeta}> 
        <p>Posted in: r/{post.subreddit}</p> 
        <p>By: u/{post.username}</p> 
      </div>
      <div className={styles.postInteractions}>  
        <button className={styles.upvote} onClick={handleUpvote}>
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
        <div className={styles.voteCount}>{post.votes}</div>
        <button className={styles.downvote} onClick={handleDownvote}>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
        <button onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide Comments" : `View Comments ${post.numComments}`}
        </button>
        {/* Conditionally render CommentSection */}
        {showComments && <CommentSection postId={post.id} subreddit={post.subreddit} />}
      </div>
    </article>
  );
}

export default PostCard;