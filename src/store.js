import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import searchReducer from './slices/searchbarSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        search: searchReducer,
    },
});
