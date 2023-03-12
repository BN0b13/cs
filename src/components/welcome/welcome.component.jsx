import React from 'react';
import logo from '../../assets/img/logo.png';
import './welcome.styles.scss';

const Welcome = ({ currentHomeDisplay, setCurrentHomeDisplay }) => {

  return (
    <div className='welcomeDiv'>
        <img src={logo} className='logo' />
        <h2>Preparing to launch late 2023</h2>
    </div>
  );
};

export default Welcome;