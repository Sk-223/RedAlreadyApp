// postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  postsBySubreddit: {}, // Object to store posts by subreddit
  isLoading: false,
  error: null,
  searchInput: [],
};

export const fetchSubredditPosts = createAsyncThunk(
  'posts/fetchSubredditPosts',
  async (subreddit, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json`);
      const json = await response.json();
      // Extract and transform post data as needed
      return json.data.children.map(child => ({
        id: child.data.id,
        title: child.data.title,
        content: child.data.selftext,
        subreddit: child.data.subreddit,
        username: child.data.author,
        type: child.data.post_hint === 'image' ? 'image' : 'text',
        imageUrl: child.data.post_hint === 'image' ? child.data.url : null,
        votes: child.data.score,
        comments: [],
        numComments: child.data.num_comments, 
        createdAt: child.data.created_utc, 
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSearchResults = createAsyncThunk(
  'posts/fetchSearchResults',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}`);
      const json = await response.json();
      // Extract and transform search results as needed (similar to fetchSubredditPosts)
      return json.data.children.map(child => ({
        id: child.data.id,
        title: child.data.title,
        content: child.data.selftext,
        subreddit: child.data.subreddit,
        // ... add other relevant properties
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      upvotePost: (state, action) => {
        const { postId, subreddit } = action.payload; // Get postId and subreddit from payload
        const post = state.postsBySubreddit[subreddit]?.find(post => post.id === postId); // Find post within the correct subreddit
        if (post) {
          post.votes += 1;
        }
      },
      downvotePost: (state, action) => {
        const { postId, subreddit } = action.payload; // Get postId and subreddit from payload
        const post = state.postsBySubreddit[subreddit]?.find(post => post.id === postId); // Find post within the correct subreddit
        if (post) {
          post.votes -= 1;
        }
      },
    },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubredditPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubredditPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postsBySubreddit[action.meta.arg] = action.payload; // Store posts by subreddit
      })
      .addCase(fetchSubredditPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;  // Update searchResults array
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { upvotePost, downvotePost } = postsSlice.actions;
export default postsSlice.reducer;
