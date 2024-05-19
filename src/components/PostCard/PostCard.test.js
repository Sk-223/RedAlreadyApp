import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import PostCard from './PostCard';
import postsReducer, { upvotePost, downvotePost } from '../../slices/postsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { formatDistanceToNow } from 'date-fns';
import { createEmbedURL } from '../../utils';

// Mock external dependencies to isolate the PostCard component during testing
jest.mock('../../utils', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue('https://www.youtube.com/embed/123456'),
}));

jest.mock('date-fns', () => ({
  formatDistanceToNow: () => '2 hours ago',
}));

// Mock the CommentSection component to simplify the test
jest.mock('../CommentSection/CommentSection', () => {
  return ({ dataTestId }) => <div data-testid={dataTestId}>Mocked Comment Section</div>;
});

describe('PostCard', () => {
  // Sample post data for testing
  const post = {
    id: '1',
    subreddit: 'funny',
    title: 'This is a funny post',
    content: 'This is the content of the post',
    type: 'text',
    username: 'john_doe',
    createdAt: 1684392000,
    votes: 10,
    numComments: 5,
  };

  // Create a mock Redux store for testing
  const mockStore = configureStore({
    reducer: {
      posts: postsReducer
    },
  });
 
  // Helper function to render the PostCard component with the mock store and router
  const setup = (postOverride = post) => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PostCard post={postOverride} />
        </MemoryRouter>
      </Provider>
    );
  };


  //Test Cases:

  it('should render the post title', () => {
    setup(); // Render the PostCard with default post data
    expect(screen.getByText('This is a funny post')).toBeInTheDocument(); // Verify title has been rendered
  });

  it('should render the post content', () => {
    setup();
    expect(screen.getByText('This is the content of the post')).toBeInTheDocument();
  });

  it('should render the post subreddit', () => {
    setup();
    expect(screen.getByText('r/funny')).toBeInTheDocument();
  });

  it('displays author information with mocked timeAgo', () => {
    setup();
    const usernameElement = screen.getByText(/By: u\/john_doe • 2 hours ago/i);
    expect(usernameElement).toBeInTheDocument();
  });

  it('dispatches upvote action on button click', () => {
    jest.spyOn(mockStore, 'dispatch'); // Spy on the dispatch function of the mock store
    setup(); // Render the PostCard

    const upvoteButton = screen.getByTestId('upvote-button'); // Find the upvote button
    fireEvent.click(upvoteButton); // Simulate a click

    // Verify that the correct action was dispatched to the store
    expect(mockStore.dispatch).toHaveBeenCalledWith(upvotePost({ postId: post.id, subreddit: post.subreddit }));
  });

  it('dispatches downvote action on button click', () => {
    jest.spyOn(mockStore, 'dispatch');
    setup();

    const downvoteButton = screen.getByTestId('downvote-button');
    fireEvent.click(downvoteButton);

    expect(mockStore.dispatch).toHaveBeenCalledWith(downvotePost({ postId: post.id, subreddit: post.subreddit }));
  });

  it('should toggle comments on button click', async () => {
    setup();

    const commentButton = screen.getByTestId('comment-button');

    // Check initial state: "View Comments 5"
    expect(commentButton).toHaveTextContent('View Comments 5');

    // Click to show comments
    fireEvent.click(commentButton);

    // Wait for the mocked CommentSection to appear and then verify it 
    expect(await screen.findByText('Mocked Comment Section')).toBeInTheDocument();

    // Click to hide comments
    fireEvent.click(commentButton);

    // Wait for the mocked CommentSection to disappear and then verify it
    await waitFor(() => {
      expect(screen.queryByText('Mocked Comment Section')).not.toBeInTheDocument();
    });
  });

  it('should render an image for image posts', () => {
    const imagePost = { ...post, type: 'image', imageUrl: 'https://example.com/image.jpg' };
    setup(imagePost); // Use the setup function with the modified post data

    expect(screen.getByTestId('post-image')).toBeInTheDocument();
    expect(screen.getByTestId('post-image')).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('should render a video for video posts', () => {
    const videoPost = { ...post, type: 'video', videoUrl: 'https://www.youtube.com/watch?v=123456' };
    setup(videoPost);

    expect(screen.getByTestId('post-video')).toBeInTheDocument();
  });

  it('should render "Loading..." when post is null', () => {
    setup(null); // Use the setup function with null post data
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});