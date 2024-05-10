// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store'; 
import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <MainSection />
    </Provider>
  );
}

export default App;
