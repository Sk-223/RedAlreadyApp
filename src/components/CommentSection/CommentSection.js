import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Comment from "../Comment/Comment";
import styles from "./CommentSection.module.css";
import { fetchComments } from "../../slices/postsSlice";

function CommentSection({ postId, subreddit }) {
  const dispatch = useDispatch();
  const { commentsByPostId, commentsLoading, commentsError } = useSelector(
    (state) => state.posts
  );
  const comments = commentsByPostId[postId] || []; // Access comments from the store

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [postId, dispatch]); // dispatch is added as a dependency

  if (commentsLoading) {
    return <p>Loading comments...</p>;
  }

  if (commentsError) {
    return <p>Error: {commentsError}</p>;
  }

  if (comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div className={styles.commentSection}>
      <h3>Comments ({comments.length})</h3>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentSection;