import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../slices/searchbarSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReddit } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';
import { fetchSearchResults } from '../../slices/searchbarSlice';

function Header() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.search.searchTerm); // Get searchTerm from the store

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    dispatch(setSearchTerm(newSearchTerm)); 
  };
  
  const handleSearchSubmit = () => {
    dispatch(fetchSearchResults({ searchTerm }));
  };

  return (
    <div className={styles.header}>
        <div className={styles.logo}>
        <FontAwesomeIcon icon={faReddit} size="2x" className={styles.logoIcon} />
          <h2>Red-Already</h2>
        </div>
        <div className={styles.searchBarContainer}>
            <input 
            type="text" 
            placeholder="Search..." 
            className={styles.searchbar}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="button" onClick={handleSearchSubmit} className={styles.searchIcon}>
            <FontAwesomeIcon icon={faSearch} aria-label="Search" />
          </button>
        </div>
    </div>
  );
}

export default Header; 
