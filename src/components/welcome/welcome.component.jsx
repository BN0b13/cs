import React from 'react';
import logo from '../../assets/img/logo.png';
import './welcome.styles.scss';

const Welcome = ({ currentHomeDisplay, setCurrentHomeDisplay }) => {
  let logoClassName = 'logo';
  if(window.screen.width < 500) {
    logoClassName = 'mobileLogo';
  }


  return (
    <div className='welcomeDiv'>
        <img src={logo} className={logoClassName} alt='Welcome to Cosmic Strains' />
        <h2 className='welcomeTxt'>Preparing to launch late 2023</h2>
    </div>
  );
};

export default Welcome;