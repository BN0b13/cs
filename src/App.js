import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

import AgeVerify from './components/app/age-verify/age-verify.component';
import ClientModal from './components/reusable/client-modal/client-modal.component';
import Footer from './components/app/footer/footer.component';
import HamburgerMenu from './components/app/hamburger-menu/hamburger-menu.component';
import Header from './components/app/header/header.component';
import Spinner from './components/reusable/spinner/spinner.component';
import Toasted from './components/reusable/toasted/toasted.component';

import AboutPage from './pages/about/about.pages';
import AccountPage from './pages/account/account.pages';
import CartPage from './pages/cart/cart.pages';
import CheckoutPage from './pages/checkout/checkout.pages';
import ErrorPage from './pages/error/error.pages';
import GiveawayPage from './pages/giveaway/giveaway.pages';
import GiveawaysPage from './pages/giveaways/giveaways.pages';
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
import UserTools from './tools/user';
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
const userTools = new UserTools();

function App() {
  const [ ageToken, setAgeToken ] = useState(sessionStorage.getItem(ageVerifyTokenName));
  const [ loading, setLoading ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ modalTitle, setModalTitle ] = useState(null);
  const [ modalImage, setModalImage ] = useState(null);
  const [ modalInput, setModalInput ] = useState('');
  const [ modalInputType, setModalInputType ] = useState('text');
  const [ modalInputPlaceholder, setModalInputPlaceholder ] = useState('');
  const [ modalLabel, setModalLabel ] = useState(null);
  const [ modalMessage, setModalMessage ] = useState('');
  const [ modalAction, setModalAction ] = useState(null);
  const [ modalActionText, setModalActionText ] = useState(null);
  const [ modalAllowCancel, setModalAllowCancel ] = useState(null);
  const [ toastMessage, setToastMessage ] = useState('');
  const [ toastError, setToastError ] = useState(false);
  const [ showToast, setShowToast ] = useState(false);

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
        let getAccount = await client.getAccount();
        currentTheme = {
          themeId: getAccount.themeId,
          themeInverted: getAccount.themeInverted
        };
        
        // Username Enhancement - ok to remove after x amount of time
        if(!getAccount.username) {
          const createUsername = async (username) => {
            if(username === '') {
              errorToast('Please enter a user name');
              return
            }
            if(username.length < 4) {
              errorToast('Username must be at least 4 characters long');
              return
            }
            
            const data = {
              id: getAccount.id,
              username
            }

            const res = await client.updateAccount(data);
            if(res.error) {
              errorToast(res.error);
              return
            }

            successToast('Username created');
            getAccount = await client.getAccount();
            setShowModal(false);
          }
          
          setModalTitle('Select Username');
          setModalMessage('We are happy to announce the roll out of usernames to support exciting upcoming features. Please select a username.');
          setModalInputType('text');
          setModalInputPlaceholder('Username');
          setModalAction(() => createUsername);
          setModalActionText('Submit');
          setModalAllowCancel(false);
          setShowModal(true);
        }
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

  const getToasted = (toast) => toast();

  const successToast = (message) => {
    setToastMessage(message);
    setToastError(false);
    setShowToast(true);
}

  const errorToast = (message) => {
      setToastMessage(message);
      setToastError(true);
      setShowToast(true);
  }

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
          path="/error" 
          element={
            <ErrorPage />
          } 
        />
        <Route 
          path="/giveaways" 
          element={
            <GiveawaysPage />
          } 
        />
        <Route 
          path="/giveaways/:id" 
          element={
            <GiveawayPage />
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
        <ClientModal 
          show={showModal}
          setShow={setShowModal}
          title={modalTitle} 
          image={modalImage}
          input={modalInput}
          setInput={(e) => userTools.usernameInputValidation(e, setModalInput)}
          inputType={modalInputType}
          inputPlaceholder={modalInputPlaceholder}
          label={modalLabel}
          message={modalMessage}
          action={modalAction} 
          actionText={modalActionText}
          allowCancel={modalAllowCancel}
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
      <Toasted 
          message={toastMessage}
          showToast={showToast}
          setShowToast={setShowToast}
          getToasted={getToasted}
          error={toastError}
      />
    </MainContainer>
  );
}

export default App;