import ReactDOM from 'react-dom/client';

import App from './App';
import { CartProvider } from './contexts/cart.context';
import { ConfigurationProvider } from './contexts/configuration.context';
import { CheckoutProvider } from './contexts/checkout.context';
import { SearchProvider } from './contexts/search.context';
import { ToastProvider } from './contexts/toast.context';
import { UserProvider } from './contexts/user.context';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastProvider>
    <ConfigurationProvider>
      <UserProvider>
        <SearchProvider>
          <CartProvider>
            <CheckoutProvider>
              <App />
            </CheckoutProvider>
          </CartProvider>
        </SearchProvider>
      </UserProvider>
    </ConfigurationProvider>
  </ToastProvider>
);
