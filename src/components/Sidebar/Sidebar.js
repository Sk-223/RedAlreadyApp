import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar() {
    const categories = ['r/popular', 'r/all', 'r/news', 'r/funny', 'r/AskReddit', 'r/gaming', 'r/science'];

    return (
        <aside className={styles.sidebar}>
        <h2>Subreddits</h2>
        <ul>
            {categories.map((category) => (
            <li key={category}>
                <Link to={`/${category.substring(2)}`} className={styles.categoryButton}>
                {category}
                </Link>
            </li>
            ))}
        </ul>
        </aside>
    );
}

export default Sidebar;
