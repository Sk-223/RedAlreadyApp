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
        votes: 0,
        comments: [ // Added comments for this post
          { id: 101, author: 'commenter1', body: 'This is a great post!' },
          { id: 102, author: 'commenter2', body: 'Interesting thoughts.' },
          { id: 103, author: 'commenter3', body: 'Interesting..' },
          { id: 104, author: 'commenter4', body: '..thoughts.' },
          { id: 105, author: 'commenter5', body: 'InterestingThoughts.' },
          { id: 106, author: 'commenter6', body: 'Interesting THoughts.' },
        ],
      },
      {
        id: 2,
        title: 'Image Post',
        content: 'Check out this image',
        subreddit: 'r/pics',
        username: 'imageLover',
        type: 'image',
        imageUrl: 'https://i.imgur.com/abcd123.jpg',
        votes: 0,
        comments: [ // Added comments for this post
          { id: 201, author: 'anotherUser', body: 'Nice photo!' },
        ],
      },
      {
        id: 3,
        title: 'Funny Cat Video',
        content: 'Hilarious!',
        subreddit: 'r/funny',
        username: 'catEnthusiast',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        votes: 0,
        comments: [] // Empty comments array for this post
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
