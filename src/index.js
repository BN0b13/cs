import ReactDOM from 'react-dom/client';

import App from './App';
import { UserProvider } from './contexts/user.context';
import { CartProvider } from './contexts/cart.context';
import { CheckoutProvider } from './contexts/checkout.context';
import { SearchProvider } from './contexts/search.context';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <SearchProvider>
      <CartProvider>
        <CheckoutProvider>
          <App />
        </CheckoutProvider>
      </CartProvider>
    </SearchProvider>
  </UserProvider>
);
