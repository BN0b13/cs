import ReactDOM from 'react-dom/client';

import App from './App';
import { UserProvider } from './contexts/user.context';
import { CartProvider } from './contexts/cart.context';
import { CheckoutProvider } from './contexts/checkout.context';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <CartProvider>
      <CheckoutProvider>
        <App />
      </CheckoutProvider>
    </CartProvider>
  </UserProvider>
);
