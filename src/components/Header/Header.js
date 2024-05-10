import React from "react";
import styles from './Header.module.css';

function Header() {
  return (
    <div className={styles.header}>
        <div className={styles.logo}>
          <img src="logo.svg" alt="Logo" className={styles.logo} />
          <h1>Reddit Clone</h1>
        </div>
      <input type="text" placeholder="Search..." className={styles.searchbar} /> 
    </div>
  );
}

export default Header; 
