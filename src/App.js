import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

import AgeVerify from './components/app/age-verify/age-verify.component';
import HamburgerMenu from './components/app/hamburger-menu/hamburger-menu.component';
import Header from './components/app/header/header.component';
import Footer from './components/app/footer/footer.component';

import AboutPage from './pages/about/about.pages';
import AccountPage from './pages/account/account.pages';
import CartPage from './pages/cart/cart.pages';
import CheckoutPage from './pages/checkout/checkout.pages';
import ContactPage from './pages/contact/contact.pages';
import HomePage from './pages/home/home.pages';
import LoginPage from './pages/login/login.pages';
import PasswordResetPage from './pages/password-reset/password-reset.pages';
import ShopPage from './pages/shop/shop.pages';
import SignUpPage from './pages/sign-up/sign-up.pages';
import ThankYouPage from './pages/thank-you/thank-you.pages';
import VerifyEmail from './components/account/verify-email/verify-email.component';

import { setMobileView } from './tools/mobileView';

import { ageVerifyTokenName } from './config';

import backgroundImage from './assets/img/stars.jpeg';

import {
  BackgroundImageContainer,
  ContentContainer
} from './App.styles';

function App() {
  const [ ageToken, setAgeToken ] = useState(sessionStorage.getItem(ageVerifyTokenName));

  const routes = () => {

    return (
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage />
          }
        />
        <Route 
          path="/about" 
          element={
            <AboutPage />
          }
        />
        <Route 
          path="/account/*" 
          element={
            <AccountPage />
          } 
        />
        <Route 
          path="/cart" 
          element={
            <CartPage />
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <CheckoutPage />
          } 
        />
        <Route 
          path="/contact" 
          element={
            <ContactPage />
          }
        />
        <Route 
          path="/login" 
          element={ 
            <LoginPage /> 
          } 
        />
        <Route 
          path="/password-reset/*" 
          element={ 
            <PasswordResetPage />
          } 
        />
        <Route 
          path="/shop/*" 
          element={
            <ShopPage />
          } 
        />
        <Route 
          path="/sign-up" 
          element={ 
            <SignUpPage /> 
          } 
        />
        <Route 
          path="/thankyou/*" 
          element={
            <ThankYouPage />
          } 
        />
        <Route 
          path="/verify-email/:emailToken" 
          element={<VerifyEmail />}
        />
      </Routes>
    );
  }

  return (
    <div id="outer-container" className="App">
      <AgeVerify 
        ageVerifyTokenName={ageVerifyTokenName}
        ageToken={ageToken}
        setAgeToken={setAgeToken}
      />
      {setMobileView() &&
        <HamburgerMenu />
      }
        <Header />
      <BackgroundImageContainer id="page-wrap" backgroundImage={backgroundImage}>
        <ContentContainer>
          <BrowserRouter>
            { routes() }
          </BrowserRouter>
        </ContentContainer>
      </BackgroundImageContainer>
        <Footer />
    </div>
  );
}

export default App;