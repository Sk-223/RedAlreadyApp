// Sidebar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar() {
  const [categories, setCategories] = useState([]); // Use state to manage categories
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const defaultAvatarUrl = 'https://via.placeholder.com/50';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.reddit.com/subreddits.json');
        const data = await response.json();
        setCategories(data.data.children.map(child => ({
          name: child.data.display_name_prefixed,
          icon: child.data.icon_img || 'https://via.placeholder.com/50', // Default avatar if no icon provided
        })));      
      } catch (error) {
        console.error('Error fetching subreddit categories:', error);
        setError('Failed to fetch subreddit categories.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
  <div className={styles.sidebar}>
    {isLoading ? (
      <p>Loading categories...</p>
    ) : error ? (
      <p>{error}</p>
    ) : (
      <ul>
        <li className={styles.subredditTitle}>Subreddits</li>
        {categories.map((category, index) => (
          <li key={category.name} className={index % 2 === 0 ? styles.even : styles.odd}>
            <img
              src={category.icon || defaultAvatarUrl}
              alt={`${category.name} icon`}
              className={`${styles.avatar} ${index % 3 === 0 ? styles.borderBlue : index % 3 === 1 ? styles.borderGreen : styles.borderRed}`}
            />
            <Link to={`/r/${category.name.substring(2)}`} className={styles.categoryButton}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

export default Sidebar;