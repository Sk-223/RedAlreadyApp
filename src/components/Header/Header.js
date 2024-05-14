import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../slices/searchbarSlice";
import styles from './Header.module.css';

function Header() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.search.searchTerm); // Get searchTerm from the store

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    dispatch(setSearchTerm(newSearchTerm)); 
  };
  
  return (
    <div className={styles.header}>
        <div className={styles.logo}>
          <img src="logo.svg" alt="Logo" className={styles.logo} />
          <h1>Reddit Clone</h1>
        </div>
      <input 
        type="text" 
        placeholder="Search..." 
        className={styles.searchbar}
        value={searchTerm}
        onChange={handleSearchChange}
      /> 
    </div>
  );
}

export default Header; 
