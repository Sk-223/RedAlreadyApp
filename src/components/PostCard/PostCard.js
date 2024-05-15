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

function PostCard({ post }) {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const timeAgo = formatDistanceToNow(new Date(post.createdAt * 1000), { addSuffix: true });

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
    <article className={styles.postCard}>
      <Link to={`/r/${post.subreddit}/${post.id}`} className={styles.postCardLink}>
        <h2>r/{post.subreddit}</h2>
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
{/* 
        <h3>
          <Link to={`/r/${post.subreddit}/${post.id}`}>
            {post.title}
          </Link>
        </h3> */}

        <hr className={styles.divider}/> {/* Add a divider */}

        <div className={styles.postFooter}>
          <div className={styles.postMeta}> 
              <p>By: u/{post.username} • {timeAgo}</p> 
          </div>
          <div className={styles.postInteractions}>
            <button className={styles.upvote} onClick={handleUpvote}>
              <FontAwesomeIcon icon={faAngleUp} />
            </button>
            <div className={styles.voteCount}>{post.votes}</div>
            <button className={styles.downvote} onClick={handleDownvote}>
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
        
            <button className={styles.commentButton} onClick={() => setShowComments(!showComments)}>
              {showComments ? "Hide Comments" : `View Comments ${post.numComments}`}
            </button>
            {/* Conditionally render CommentSection */}
            {showComments && <CommentSection postId={post.id} subreddit={post.subreddit} />}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PostCard;