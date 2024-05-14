import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store'; 
import { Route, Routes } from 'react-router-dom';
import SubredditContent from './components/SubredditContent/SubredditContent';
import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './App.module.css';

function App() {
  return (
    <Provider store={store}>
      <div className={styles.appContainer}>
        <Header />
        <div className={styles.contentContainer}>
          <Routes>
            {/* A Route for each subreddit and a default route */}
            <Route path="/" element={<MainSection className={styles.mainSection} />} />
            <Route path="/r/:subreddit" element={<SubredditContent />} />
          </Routes>
          <Sidebar className={styles.sidebar}/>
        </div>
      </div>
    </Provider>
  );
}

export default App;
