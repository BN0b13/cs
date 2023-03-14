import React from 'react';
import Nav from 'react-bootstrap/Nav';

import { tokenName } from '../../assets/config';
import text from '../../assets/img/text.png';
import './header.styles.scss';

const loggedIn = ({ currentHomeDisplay, setCurrentHomeDisplay }) => {
  let currentLink = null;
  if(currentHomeDisplay === 'home') {
    currentLink = (
      <Nav.Link onClick={() => setCurrentHomeDisplay('profile')}>Profile</Nav.Link>
    );
  }
  if(currentHomeDisplay === 'profile') {
    currentLink = (
      <Nav.Link onClick={() => setCurrentHomeDisplay('home')}>Home</Nav.Link>
    );
  }
  if(localStorage.getItem(tokenName)) {
    return (
      <div className='logged-in-div'>
        <Nav defaultActiveKey="/" className="navbar-logged-in">
          {/* { currentLink } */}
          <Nav.Link 
            onClick={() => {
              localStorage.removeItem(tokenName);
              sessionStorage.removeItem(tokenName);
              window.location = '/';
            }}
          >
            Log Out
          </Nav.Link>
        </Nav>
      </div>
    );
  } else if(window.location.pathname == '/login') {
    return (
      <div className='logged-in-div'>
        <Nav defaultActiveKey="/" className="navbar-logged-in">
          <Nav.Link 
            onClick={() => {
              window.location = '/';
            }}
          >
            Cancel
          </Nav.Link>
        </Nav>
      </div>
    );
  } else {
    let currentPath = (
      <Nav.Link 
          onClick={() => {
            localStorage.removeItem(tokenName);
            sessionStorage.removeItem(tokenName);
            window.location = '/shop';
          }}
        >
          Lines
        </Nav.Link>
    );

    return (
      <div className='logged-in-div'>
        <Nav defaultActiveKey="/" className="navbar-logged-in">
          { currentPath }
          <Nav.Link 
            onClick={() => {
              window.location = '/login';
            }}
          >
            Log In
          </Nav.Link>
        </Nav>
      </div>
    );
  }
}

const Header = ({ currentHomeDisplay, setCurrentHomeDisplay }) => {
  return (
    <div className='header'>
      <div className='logo-container'>
        {<a onClick={() => window.location = '/'} >
          {<img src={text} className='logo' />}
        </a>}
      </div>
      <div className='options'>
        {loggedIn({ currentHomeDisplay, setCurrentHomeDisplay })}
      </div>
    </div>
  );
};

export default Header;