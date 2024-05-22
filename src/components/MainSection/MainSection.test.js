import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import MainSection from './MainSection';
import postsReducer from '../../slices/postsSlice';
import searchReducer from '../../slices/searchbarSlice';

// Mock the PostCard component
jest.mock('../PostCard/PostCard', () => {
  return ({ post }) => <div>{post.title}</div>;
});

// Test Cases:

describe('MainSection', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: postsReducer,
        search: searchReducer,
      },
    });
  });

  it('should render loading state', () => {
    store.dispatch({ type: 'posts/fetchSubredditPosts/pending' });
    render(
      <Provider store={store}>
        <MainSection />
      </Provider>
    );
    expect(screen.getByText('Loading posts...')).toBeInTheDocument();
  });

  it('should render error state', () => {
    const mockState = {
      posts: {
        isLoading: false,
        error: 'Network error',
        posts: [],
      },
    };
    store = configureStore({
        reducer: {
          posts: () => mockState.posts,
          search: searchReducer,
        },
      });

    render(
        <Provider store={store}>
        <MainSection />
        </Provider>
    );
    expect(screen.getByText('Error: Network error')).toBeInTheDocument();
  });

  it('should render posts', () => {
    const mockState = {
        posts: {
          isLoading: false,
          error: null,
          postsBySubreddit: {
            popular: [
              { id: '1', title: 'Post 1', selftext: '', subreddit: '', username: '', createdAt: Math.floor(Date.now() / 1000) }, 
              { id: '2', title: 'Post 2', selftext: '', subreddit: '', username: '', createdAt: Math.floor(Date.now() / 1000)}
            ]
          },
        },
      };
      
      store = configureStore({
        reducer: {
          posts: () => mockState.posts,
          search: searchReducer,
        },
      });
    
      render(
        <Provider store={store}>
          <MemoryRouter>
            <MainSection />
          </MemoryRouter>
        </Provider>
      );
      expect(screen.getByTestId('main-section')).toBeInTheDocument();
      expect(screen.getByText('Post 1')).toBeInTheDocument();
      expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  it('should update when posts state changes', () => {
    const mockState = {
      posts: {
        isLoading: false,
        error: null,
        posts: [{ id: 1, title: 'Test Post', body: 'Test Body' }],
      },
    };
    store = configureStore({
      reducer: {
        posts: () => mockState.posts,
        search: searchReducer,
      },
    });
    render(
      <Provider store={store}>
        <MainSection />
      </Provider>
    );
    // Use waitFor to wait for the 'Test Post' text to appear
    waitFor(async () => {
      const postElement = await screen.findByText('Test Post');
      expect(postElement).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});