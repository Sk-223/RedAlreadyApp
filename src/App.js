import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store'; 
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
          <MainSection />
          <Sidebar />
        </div>
      </div>
    </Provider>
  );
}

export default App;
