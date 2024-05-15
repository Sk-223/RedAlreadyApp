// Sidebar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar() {
  const [categories, setCategories] = useState([]); // Use state to manage categories
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.reddit.com/subreddits.json');
        const data = await response.json();
        setCategories(data.data.children.map(child => child.data.display_name_prefixed));
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
    <aside className={styles.sidebar}>
        <h2>Subreddits</h2>
        {isLoading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <Link to={`/r/${category.substring(2)}`} className={styles.categoryButton}>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </aside>
  );
}

export default Sidebar;