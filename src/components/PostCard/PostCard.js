import React, { useState } from 'react';
import styles from './PostCard.module.css';
import { createEmbedURL, getRandomColor }from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment as farFaComment } from '@fortawesome/free-regular-svg-icons';
import {  faLongArrowDown, faLongArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { upvotePost, downvotePost } from '../../slices/postsSlice';
import CommentSection from '../CommentSection/CommentSection';

import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

function PostCard({ post, hideCommentsButton }) {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(post.avatarUrl);

  const timeAgo = post ? formatDistanceToNow(new Date(post.createdAt * 1000), { addSuffix: true }) : '';
  const defaultAvatarUrl = `https://via.placeholder.com/50/${post.id % 5}.png`;
  const avatarColor = getRandomColor();
  
  const handleUpvote = () => {
    dispatch(upvotePost({ postId: post.id, subreddit: post.subreddit }));
  };

  const handleDownvote = () => {
    dispatch(downvotePost({ postId: post.id, subreddit: post.subreddit }));
  };

  const handleImageError = () => {
    setAvatarUrl(defaultAvatarUrl);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article className={styles.postCard} data-testid="post-card">
      <div className={styles.postContentRow}>
        <div className={styles.voteSection}>
          <button className={styles.upvote} onClick={handleUpvote} data-testid="upvote-button">
            <FontAwesomeIcon icon={faLongArrowUp} />
          </button>
          <div className={styles.voteCount}>{post.votes}</div>
            <button className={styles.downvote} onClick={handleDownvote} data-testid="downvote-button">
              <FontAwesomeIcon icon={faLongArrowDown} />
            </button>
        </div>
        <div className={styles.postContentWrapper}>
          <Link to={`/r/${post.subreddit}/${post.id}`} className={styles.postCardLink}>
            <h2 data-testid="subreddit">r/{post.subreddit}</h2>
            <h3 className={styles.title} data-testid="post-title">{post.title}</h3>
            <div className={styles.postContent}>
              {post.type === 'text' && <p data-testid="post-content">{post.content}</p>}
              {post.type === 'image' && (
                <div className={styles.imageContainer}>
                  <img src={post.imageUrl} alt={post.title} className={styles.postImage} data-testid="post-image" />
                </div>
              )}
              {post.type === 'video' && post.videoUrl && (
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
          </Link>
        </div>
      </div>
      <hr className={styles.divider} data-testid="divider"/> {/* Add a divider */}

      <div className={styles.postFooter}>
        <div className={styles.postMeta}>        
          <div
            style={{ backgroundColor: avatarUrl ? 'transparent' : avatarColor }}
            className={`${styles.avatar} ${!avatarUrl && styles.defaultAvatar}`}
          >
            <img
              src={avatarUrl || defaultAvatarUrl}
              alt="Avatar"
              onError={handleImageError}
            />
          </div>
          <p data-testid="post-username">u/{post.username} • {timeAgo}</p> 
        </div>
        <div className={styles.postInteractions}>        
          {!hideCommentsButton && (
            <button className={styles.commentButton} onClick={() => setShowComments(!showComments)} data-testid="comment-button">
              {showComments ? "Hide Comments" : ` ${post.numComments} `}
              <FontAwesomeIcon icon={farFaComment} className={styles.commentIcon}/>
            </button>
          )}
          {/* Conditionally render CommentSection */}
          {showComments && <CommentSection postId={post.id} subreddit={post.subreddit} data-testid="comment-section" />}
        </div>
      </div>
    </article>
  );
}

export default PostCard;