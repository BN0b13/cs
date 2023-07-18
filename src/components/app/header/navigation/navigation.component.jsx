import CartIcon from '../../cart-icon/cart-icon.component';

import { 
    menuItemsPublic,
    menuItemsLoggedIn
  } from '../../../../assets/menu-items';
import { tokenName } from '../../../../config';

import {
    NavigationContainer,
    NavOptions,
    HeaderLink
} from './navigation.styles';

const Navigation = () => {
    const loggedInStatus = localStorage.getItem(tokenName);

    if(window.location.pathname === '/login') {
        return (
            <NavOptions>
                <HeaderLink href={`/`}>
                    Cancel
                </HeaderLink>
            </NavOptions>
        )
    }

    return (
        <NavigationContainer>
            {menuItemsPublic.map((item, index) => {
                return (
                    <HeaderLink key={index} href={item.path}>
                        { item.title }
                    </HeaderLink>
                );
            })}
            {loggedInStatus ?
                <>
                    {menuItemsLoggedIn.map((item, index) => {
                        return (
                            <HeaderLink key={index} href={item.path}>
                                { item.title }
                            </HeaderLink>
                        )
                    })}
                    <HeaderLink 
                        onClick={() => {
                        localStorage.removeItem(tokenName);
                        sessionStorage.removeItem(tokenName);
                        window.location = '/';
                        }}
                    >
                        Log Out
                    </HeaderLink>
                </>
            :
                <HeaderLink href={`/login`}>
                    Log In
                </HeaderLink>
            }
            <CartIcon loggedInStatus={loggedInStatus} />
        </NavigationContainer>
    )
}

export default Navigation;