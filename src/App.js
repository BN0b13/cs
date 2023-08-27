import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

import AgeVerify from './components/app/age-verify/age-verify.component';
import Footer from './components/app/footer/footer.component';
import HamburgerMenu from './components/app/hamburger-menu/hamburger-menu.component';
import Header from './components/app/header/header.component';
import Spinner from './components/reusable/spinner/spinner.component';

import AboutPage from './pages/about/about.pages';
import AccountPage from './pages/account/account.pages';
import CartPage from './pages/cart/cart.pages';
import CheckoutPage from './pages/checkout/checkout.pages';
import HomePage from './pages/home/home.pages';
import LoginPage from './pages/login/login.pages';
import PasswordResetPage from './pages/password-reset/password-reset.pages';
import ProductsPage from './pages/products/products.pages';
import ShopPage from './pages/shop/shop.pages';
import SignUpPage from './pages/sign-up/sign-up.pages';
import ThankYouPage from './pages/thank-you/thank-you.pages';
import VerifyEmail from './components/account/verify-email/verify-email.component';

import { ConfigurationContext } from './contexts/configuration.context';
import { UserContext } from './contexts/user.context';

import Client from './tools/client';
import { setMobileView } from './tools/mobileView';

import { ageVerifyTokenName, themeTokenName, tokenName } from './config';

import backgroundImage from './assets/img/stars.jpeg';

import {
  AppLoadingContainer,
  BackgroundImageContainer,
  ContentContainer,
  MainContainer
} from './App.styles';

const client = new Client();

function App() {
  const [ ageToken, setAgeToken ] = useState(sessionStorage.getItem(ageVerifyTokenName));
  const [ loading, setLoading ] = useState(false);

  const { theme, setAppTheme } = useContext(ConfigurationContext);
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const themeToken = localStorage.getItem(themeTokenName);
    
    if(themeToken) {
      const savedTheme =  JSON.parse(themeToken);
      setAppTheme(savedTheme, savedTheme.colors.primary);
    }

    const setAppContext = async () => {
      let currentTheme = {
        themeInverted: false
      };

      const getAppConfiguration = await client.configuration();
      const token = localStorage.getItem(tokenName);
      
      if(token) {
        const getAccount = await client.getAccount();
        currentTheme = {
          themeId: getAccount.themeId,
          themeInverted: getAccount.themeInverted
        };
        setCurrentUser(getAccount);
      } else {
        localStorage.removeItem(tokenName);
      }

      const savedTheme = JSON.parse(themeToken);
      
      if(!savedTheme) {
        setLoading(true);
        const theme = getAppConfiguration.rows[0].Theme;
        const colors = currentTheme.themeInverted ? theme.colors.secondary : theme.colors.primary;
        setAppTheme(theme, colors);
        setLoading(false);
      } else {
        if(savedTheme.id != getAppConfiguration.rows[0].Theme.id || 
          savedTheme.updatedAt !== getAppConfiguration.rows[0].Theme.updatedAt) {
          setLoading(true);
          const theme = getAppConfiguration.rows[0].Theme;
          const colors = currentTheme.themeInverted ? theme.colors.secondary : theme.colors.primary;
          setAppTheme(theme, colors);
          setLoading(false);
        }
      }
    }

    setAppContext();
  }, []);

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
          path="/products/*" 
          element={ 
            <ProductsPage />
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
    <MainContainer id="outer-container" className="App">
      {loading ?
        <AppLoadingContainer>
          <Spinner />
        </AppLoadingContainer>
      :
        <>
        <AgeVerify 
          ageVerifyTokenName={ageVerifyTokenName}
          ageToken={ageToken}
          setAgeToken={setAgeToken}
        />
        {setMobileView() &&
          <HamburgerMenu />
        }
        <Header />
        <BackgroundImageContainer id="page-wrap" theme={theme} backgroundImage={backgroundImage}>
          <ContentContainer>
            <BrowserRouter>
              { routes() }
            </BrowserRouter>
          </ContentContainer>
        </BackgroundImageContainer>
        <Footer />
      </>}
    </MainContainer>
  );
}

export default App;