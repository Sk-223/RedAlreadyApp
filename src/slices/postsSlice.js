import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [
    { 
      id: 1, 
      title: 'Example Post 1', 
      content: 'Some text content', 
      subreddit: 'r/example', 
      username: 'user123', 
      type: 'text',
      votes: 0 
    },
    {
      id: 2,
      title: 'Image Post', 
      content: 'Check out this image', 
      subreddit: 'r/pics', 
      username: 'imageLover', 
      type: 'image', 
      imageUrl: 'https://i.imgur.com/abcd123.jpg',
      votes: 0
    },
    {
      id: 3,
      title: 'Funny Cat Video', 
      content: 'Hilarious!', 
      subreddit: 'r/funny', 
      username: 'catEnthusiast', 
      type: 'video', 
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Add a placeholder video URL
      votes: 0
    },
  ],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    upvotePost: (state, action) => {
      const postId = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.votes += 1;
      }
    },
    downvotePost: (state, action) => {
      const postId = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.votes -= 1;
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { upvotePost, downvotePost, setPosts } = postsSlice.actions;
export default postsSlice.reducer;