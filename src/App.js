import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import './App.scss';
import { customReactTheme } from './assets/custom-theme';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import HomePage from './pages/home/home.pages';

const showLoading = false;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState(customReactTheme(darkMode));
  const [currentHomeDisplay, setCurrentHomeDisplay] = useState('home');

  const Loading = () => {
    return (
      <div className='spinnerDiv'>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  const header = () => {
    return (
      <Header 
          currentHomeDisplay={currentHomeDisplay}
          setCurrentHomeDisplay={setCurrentHomeDisplay}
        />
    );
  }

  const routes = () => {
    if(showLoading) {
      return (
        <Routes>
          <Route 
            path="/" 
            element={<Loading />} 
          />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route 
            path="/" 
            element={
            <HomePage
              currentHomeDisplay={currentHomeDisplay}
            />
            }
          />
        </Routes>
      );
    }
  }

  return (
    <div className="App">
      <style type="text/css">{ theme }</style>
      {/* {header()} */}
      <BrowserRouter>
        { routes() }
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;