// PostDetailView.js
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../PostCard/PostCard";
import CommentSection from "../CommentSection/CommentSection"; // Import CommentSection
import styles from "./PostDetailView.module.css";
import { fetchComments } from "../../slices/postsSlice";

function PostDetailView() {
  const { postId, subreddit } = useParams(); // get the post and subreddit name from the url
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { postsBySubreddit, isLoading, error } = useSelector(
    (state) => state.posts
  );
  const post = postsBySubreddit[subreddit]?.find((p) => p.id === postId);

  useEffect(() => {
    if (!post) {
      navigate(`/r/${subreddit}`);
    } else {
      dispatch(fetchComments(postId));
    }
  }, [subreddit, post, navigate, dispatch, postId]);

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className={styles.postDetailView}>
      <PostCard post={post} />
      <CommentSection postId={postId} subreddit={subreddit} />
    </div>
  );
}

export default PostDetailView;