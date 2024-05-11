import React from 'react';
import styles from './Sidebar.module.css';

function Sidebar() {
  const categories = ['Popular', 'All', 'News', 'Funny', 'AskReddit', 'Gaming', 'Science'];

  return (
    <aside className={styles.sidebar}>
      <h2>Subreddits</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <button className={styles.categoryButton}>{category}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
