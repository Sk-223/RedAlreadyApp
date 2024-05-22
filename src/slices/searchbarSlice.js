import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearchResults = createAsyncThunk(
  'searchBar/fetchSearchResults',
  async ({ searchTerm, subreddit = '', after = '', count = 0 }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.reddit.com/r/search.json?q=${searchTerm}&after=${after}&count=${count}`);
      const json = await response.json();
      console.log(json); // Log the response

      if (!json.data || !json.data.children) {
        return { posts: [], after: '', count: 0 };
      }

      return {
        posts: json.data.children.map(child => ({
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
        })),
        after: json.data.after,
        count: count + 25
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  searchTerm: '',
  posts: [],
  isLoading: false,
  error: null,
  after: '',
  count: 0,
};

const searchSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.after = action.payload.after;
        state.count = action.payload.count;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;