import React from 'react';
// import Nav from 'react-bootstrap/Nav';
import './header.styles.scss';

const Header = ({ currentHomeDisplay, setCurrentHomeDisplay }) => {
  return (
    <div className='header'>
      <div className='logo-container'>
        <a onClick={() => setCurrentHomeDisplay('home')} >
          <p>Cosmic Strains</p>
        </a>
      </div>
      <div className='options'>
        <p>Log in/Log out</p>
      </div>
    </div>
  );
};

export default Header;