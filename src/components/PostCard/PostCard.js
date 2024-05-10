import React from 'react';
import styles from './PostCard.module.css';
import createEmbedURL from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { upvotePost, downvotePost } from '../../slices/postsSlice';

function PostCard({ postId }) {
  const post = useSelector((state) => state.posts.posts.find(p => p.id === postId));
  const dispatch = useDispatch();

  const handleUpvote = () => {
    dispatch(upvotePost(postId));
  };

  const handleDownvote = () => {
    dispatch(downvotePost(postId));
  };

  if (!post) {
    return null;
  } // Return null if post is not found

  return (
    <article className={styles.postCard}>
        <h3>{post.title}</h3> {/* We'll populate this with data soon */}
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
      </div>
    </article>
  );
}

export default PostCard; 
