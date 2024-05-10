import React from 'react';
import PostCard from '../PostCard/PostCard';

function MainSection() {  
    const mockPosts = [
        { title: 'Example Post 1', content: 'Some text content', subreddit: 'r/example', username: 'user123', type: 'text'},
    
        { title: 'Image Post', content: 'Check out this image', subreddit: 'r/pics', username: 'imageLover', type: 'image', imageUrl: 'https://i.imgur.com/abcd123.jpg' }, 
    
        { title: 'Funny Cat Video', content: 'Hilarious!', subreddit: 'r/funny', username: 'catEnthusiast', type: 'video', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'},
    ]; 
    

    return (
        <div className="main-section">
            {mockPosts.map((post) => (
                <PostCard key={post.title} post={post} />
            ))}
        </div>
    );
}

export default MainSection; 
