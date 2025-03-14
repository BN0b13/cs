import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './App.css';

import ClientModal from './components/reusable/client-modal/client-modal.component';
import Footer from './components/app/footer/footer.component';
import HamburgerMenu from './components/app/hamburger-menu/hamburger-menu.component';
import Header from './components/app/header/header.component';
import Spinner from './components/reusable/spinner/spinner.component';
import Toasted from './components/reusable/toasted/toasted.component';

import AccountPage from './pages/account/account.pages';
import AuctionsPage from './pages/auctions/auctions.pages';
import CartPage from './pages/cart/cart.pages';
import CheckoutPage from './pages/checkout/checkout.pages';
import CustomPage from './pages/custom/custom.pages';
import ErrorPage from './pages/error/error.pages';
import GiveawayPage from './pages/giveaway/giveaway.pages';
import GiveawaysPage from './pages/giveaways/giveaways.pages';
import LoginPage from './pages/login/login.pages';
import PasswordResetPage from './pages/password-reset/password-reset.pages';
import ProductsPage from './pages/products/products.pages';
import RafflesPage from './pages/raffles/raffles.pages';
import SignUpPage from './pages/sign-up/sign-up.pages';
import ThankYouPage from './pages/thank-you/thank-you.pages';
import VerifyEmail from './components/account/verify-email/verify-email.component';

import { ConfigurationContext } from './contexts/configuration.context';
import { ToastContext } from './contexts/toast.context.jsx';
import { UserContext } from './contexts/user.context';

import Client from './tools/client.js';
import CMSTool from './tools/cms.js';
import Tools from './tools/tools.js';
import { setMobileView, setTabletView } from './tools/mobileView';

import { pagesConfig } from './config/cms.js';
import { ageVerifyTokenName, themeTokenName, tokenName } from './config/tokens.js';
import { imageRouter } from './config/images.js';

import {
  AppLoadingContainer,
  BackgroundImageContainer,
  ContentContainer,
  MainContainer
} from './App.styles';

const client = new Client();
const cmsTool = new CMSTool();
const tools = new Tools();

const ShopPage = pagesConfig.shop.active ? lazy(() => import("./pages/shop/shop.pages.jsx")) : null;

const AgeVerify = pagesConfig.shop.active ? lazy(() => import("./components/app/age-verify/age-verify.component")) : null;

function App() {
  const [ loading, setLoading ] = useState(true);
  const [ ageToken, setAgeToken ] = useState(sessionStorage.getItem(ageVerifyTokenName));
  const [ showModal, setShowModal ] = useState(false);
  const [ modalTitle, setModalTitle ] = useState(null);
  const [ modalImage, setModalImage ] = useState(null);
  const [ showModalInput, setShowModalInput ] = useState(true);
  const [ modalInput, setModalInput ] = useState('');
  const [ modalInputType, setModalInputType ] = useState('text');
  const [ modalInputPlaceholder, setModalInputPlaceholder ] = useState('');
  const [ modalLabel, setModalLabel ] = useState(null);
  const [ modalMessage, setModalMessage ] = useState('');
  const [ modalAction, setModalAction ] = useState(null);
  const [ modalActionText, setModalActionText ] = useState(null);
  const [ modalAllowCancel, setModalAllowCancel ] = useState(null);
  const [ modalSubtext, setModalSubtext ] = useState('');

  const [ pages, setPages ] = useState([]);

  const { colors, theme, setAppTheme, configuration, setConfiguration } = useContext(ConfigurationContext);
  const { showToast,
     setShowToast, 
     getToasted, 
     toastError, 
     toastMessage, 
     errorToast, 
     successToast 
  } = useContext(ToastContext);
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const themeToken = localStorage.getItem(themeTokenName);
    
    if(themeToken) {
      const savedTheme =  JSON.parse(themeToken);
      setAppTheme(savedTheme, savedTheme.colors.primary);
    }

    const setAppContext = async () => {
      const getAppConfiguration = await client.configuration();
      setConfiguration(getAppConfiguration.rows[0]);

      const getPages = await client.getPages();

      setPages(getPages.rows);

      let currentTheme = {
        themeInverted: false
      };

      const token = localStorage.getItem(tokenName);
      
      if(token) {
        let getAccount = await client.getAccount();

        if(getAccount.status === 'inactive') {
          setModalTitle('Account Inactive');
          setModalMessage('This account is inactive. Please log out.');
          setModalInput(null);
          setModalAction(() => tools.logOut());
          setModalActionText('Log Out');
          setModalAllowCancel(false);
          setShowModal(true);
        }

        currentTheme = {
          themeId: getAccount.themeId,
          themeInverted: getAccount.themeInverted
        };
        
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
          setModalSubtext('In order to create a welcoming environment for all, usernames that are hateful, homophobic, racist, sexist, derogatory, harassing, or otherwise uncivil are grounds for account termination.');
          setModalInput('');
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
        const theme = getAppConfiguration.rows[0].Theme;
        const colors = currentTheme.themeInverted ? theme.colors.secondary : theme.colors.primary;
        setAppTheme(theme, colors);
      } else {
        if(savedTheme.id != getAppConfiguration.rows[0].Theme.id || 
          savedTheme.updatedAt !== getAppConfiguration.rows[0].Theme.updatedAt) {
          const theme = getAppConfiguration.rows[0].Theme;
          const colors = currentTheme.themeInverted ? theme.colors.secondary : theme.colors.primary;
          setAppTheme(theme, colors);
        }
      }
      setLoading(false);
    }

    setAppContext();
  }, []);

  const getHomePageComponent = () => {
    if (pagesConfig.shop?.active && pages.length === 0) return (<ShopPage />);
    return (<ErrorPage />); // Fallback if no pages are active
  };

  const routes = () => {

    return (
      <Routes>
        {pages.map((page, index) => 
          <Route key={index} path={page.url} element={<CustomPage page={page} />} />
        )}
        <Route path="/" element={getHomePageComponent()} />
        {ShopPage && <Route 
          path="/account/*" 
          element={
            <AccountPage />
          } 
        />}
        {ShopPage && <Route 
          path="/auctions/*" 
          element={
            <AuctionsPage />
          } 
        />}
        {ShopPage && <Route 
          path="/cart" 
          element={
            <CartPage />
          } 
        />}
        {ShopPage && <Route 
          path="/checkout" 
          element={
            <CheckoutPage />
          } 
        />}
        {ShopPage && <Route 
          path="/giveaways" 
          element={
            <GiveawaysPage />
          } 
        />}
        {ShopPage && <Route 
          path="/giveaways/:id" 
          element={
            <GiveawayPage />
          } 
        />}
        {ShopPage && <Route 
          path="/login" 
          element={ 
            <LoginPage /> 
          } 
        />}
        {ShopPage && <Route 
          path="/password-reset/*" 
          element={ 
            <PasswordResetPage />
          } 
        />}
        {ShopPage && <Route 
          path="/products/*" 
          element={ 
            <ProductsPage />
          } 
        />}
        {ShopPage && <Route 
          path="/raffles/*" 
          element={ 
            <RafflesPage />
          } 
        />}
        {ShopPage && <Route 
          path="/shop/*" 
          element={
            <ShopPage />
          } 
        />}
        {ShopPage && <Route 
          path="/sign-up" 
          element={ 
            <SignUpPage /> 
          } 
        />}
        {ShopPage && <Route 
          path="/thankyou/*" 
          element={
            <ThankYouPage />
          } 
        />}
        {ShopPage && <Route 
          path="/verify-email/:emailToken" 
          element={<VerifyEmail />}
        />}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
  }

  return (
    <MainContainer id="outer-container" className="App">
      <Suspense fallback={<Spinner />}>
      {!configuration ?
        <AppLoadingContainer>
          <Spinner />
        </AppLoadingContainer>
      :
        <>
        {AgeVerify && <AgeVerify 
          company={configuration.company}
          ageVerifyTokenName={ageVerifyTokenName}
          ageToken={ageToken}
          setAgeToken={setAgeToken}
        />}
        <ClientModal 
          show={showModal}
          setShow={setShowModal}
          title={modalTitle} 
          image={modalImage}
          input={modalInput}
          setInput={(e) => tools.usernameInputValidation(e, setModalInput)}
          inputType={modalInputType}
          inputPlaceholder={modalInputPlaceholder}
          label={modalLabel}
          message={modalMessage}
          subtext={modalSubtext}
          action={modalAction} 
          actionText={modalActionText}
          allowCancel={modalAllowCancel}
        />
        {((setTabletView() || setMobileView()) && !cmsTool.spaCheck()) &&
          <HamburgerMenu />
        }
        <Header />
        <BackgroundImageContainer id="page-wrap" theme={theme} backgroundImage={imageRouter.app.background.path}>
          <ContentContainer>
            {loading ?
             <Spinner />
            :
              <BrowserRouter>
                { routes() }
              </BrowserRouter>
            }
          </ContentContainer>
        </BackgroundImageContainer>
        <Footer colors={colors} company={configuration.company} />
      </>}
      <Toasted 
          message={toastMessage}
          showToast={showToast}
          setShowToast={setShowToast}
          getToasted={getToasted}
          error={toastError}
      />
      </Suspense>
    </MainContainer>
  );
}

export default App;