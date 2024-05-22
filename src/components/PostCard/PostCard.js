// PostCard.js
import React, { useState } from 'react';
import styles from './PostCard.module.css';
import createEmbedURL from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { upvotePost, downvotePost } from '../../slices/postsSlice';
import CommentSection from '../CommentSection/CommentSection';

import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

function PostCard({ post, hideCommentsButton }) {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const timeAgo = post ? formatDistanceToNow(new Date(post.createdAt * 1000), { addSuffix: true }) : '';

  const handleUpvote = () => {
    dispatch(upvotePost({ postId: post.id, subreddit: post.subreddit }));
  };

  const handleDownvote = () => {
    dispatch(downvotePost({ postId: post.id, subreddit: post.subreddit }));
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article className={styles.postCard} data-testid="post-card">
      <Link to={`/r/${post.subreddit}/${post.id}`} className={styles.postCardLink}>
        <h2 data-testid="subreddit">r/{post.subreddit}</h2>
        <h3 data-testid="post-title">{post.title}</h3>
        <div className={styles.postContent}>
          {(post.type === 'text') ? <p data-testid="post-content">{post.content}</p> : null}
          {(post.type === 'image') ? <img src={post.imageUrl} alt={post.title} data-testid="post-image" /> : null}
          {(post.type === 'video' && post.videoUrl) && ( 
            <div className={styles.videoContainer} data-testid="post-video">
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

        <hr className={styles.divider} data-testid="divider"/> {/* Add a divider */}

        <div className={styles.postFooter}>
          <div className={styles.postMeta}> 
              <p data-testid="post-username">By: u/{post.username} • {timeAgo}</p> 
          </div>
          <div className={styles.postInteractions}>
            <button className={styles.upvote} onClick={handleUpvote} data-testid="upvote-button">
              <FontAwesomeIcon icon={faAngleUp} />
            </button>
            <div className={styles.voteCount}>{post.votes}</div>
            <button className={styles.downvote} onClick={handleDownvote} data-testid="downvote-button">
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
        
            {!hideCommentsButton && (
              <button className={styles.commentButton} onClick={() => setShowComments(!showComments)} data-testid="comment-button">
                {showComments ? "Hide Comments" : `View Comments ${post.numComments}`}
              </button>
            )}
            {/* Conditionally render CommentSection */}
            {showComments && <CommentSection postId={post.id} subreddit={post.subreddit} data-testid="comment-section" />}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PostCard;