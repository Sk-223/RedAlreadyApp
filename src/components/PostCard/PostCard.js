import React from 'react';
import styles from './PostCard.module.css';
import createEmbedURL from '../../utils';
function PostCard({ post }) { // We'll receive post data as a prop

  return (
    <article className={styles.postCard}>
        <h3>{post.title}</h3> {/* We'll populate this with data soon */}
        <div className="post-content"> 
          {(post.type === 'text') ? <p>{post.content}</p> : null}
          {(post.type === 'image') ? <img src={post.imageUrl} alt={post.title} /> : null}
          {(post.type === 'video' && post.videoUrl) && ( 
            <div className="video-container">
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
        <div className="post-meta"> 
          <p>Posted in: r/{post.subreddit}</p> 
          <p>By: u/{post.username}</p> 
        </div>
        <div className="post-interactions"> 
          {/* Voting System - To be added later */}
          {/* Comment Button -  To be added later */}
        </div>
    </article>
  );
}

export default PostCard; 
