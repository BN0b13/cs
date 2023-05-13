import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

import AgeVerify from './components/age-verify/age-verify.component';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

import AboutPage from './pages/about/about.pages';
import AccountPage from './pages/account/account.pages';
import CartPage from './pages/cart/cart.pages';
import CheckoutPage from './pages/checkout/checkout.pages';
import ContactPage from './pages/contact/contact.pages';
import HomePage from './pages/home/home.pages';
import LoginPage from './pages/login/login.pages';
import ShopPage from './pages/shop/shop.pages';
import ThankYou from './pages/thank-you/thank-you.pages';

import {
  ageVerifyTokenName
} from './config';

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
          path="/account" 
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
          path="/shop/*" 
          element={
            <ShopPage />
          } 
        />
        <Route 
          path="/thankyou" 
          element={
            <ThankYou />
          } 
        />
      </Routes>
    );
  }

  return (
    <div className="App">
      <Header />
      <AgeVerify 
        ageVerifyTokenName={ageVerifyTokenName}
        ageToken={ageToken}
        setAgeToken={setAgeToken}
      />
      <BrowserRouter>
        { routes() }
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;