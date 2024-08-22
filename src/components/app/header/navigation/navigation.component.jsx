import { useContext } from 'react';

import CartIcon from '../../cart-icon/cart-icon.component';
import Dropdown from '../dropdown/dropdown.component';
import Search from '../search/search.component';

import { 
    menuItemsPublic,
    menuItemsLoggedIn
} from '../../../../assets/menu-items';

import { ConfigurationContext } from '../../../../contexts/configuration.context';

import { tokenName } from '../../../../config';

import {
    NavigationContainer,
    NavOptions,
    HeaderLink,
    HeaderNonLink
} from './navigation.styles';

const Navigation = () => {
    const { colors } = useContext(ConfigurationContext);

    const loggedInStatus = localStorage.getItem(tokenName);

    if(window.location.pathname === '/login') {
        return (
            <NavOptions>
                <HeaderLink theme={colors} href={`/`}>
                    Cancel
                </HeaderLink>
            </NavOptions>
        )
    }

    return (
        <NavigationContainer theme={colors}>
            <Search />
            {menuItemsPublic.map((item, index) => {
                if(item.title === 'Shop') {
                    return (
                        <Dropdown key={index} theme={colors} item={item} />
                    )
                }

                return (
                    <HeaderLink key={index} theme={colors} href={item.path}>
                        { item.title }
                    </HeaderLink>
                );
            })}
            {loggedInStatus ?
                <>
                    {menuItemsLoggedIn.map((item, index) => {
                        return (
                            <HeaderLink key={index} theme={colors} href={item.path}>
                                { item.title }
                            </HeaderLink>
                        )
                    })}
                    <HeaderLink
                        theme={colors}
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
                <HeaderLink theme={colors} href={`/login`}>
                    Log In
                </HeaderLink>
            }
            <CartIcon loggedInStatus={loggedInStatus} />
        </NavigationContainer>
    )
}

export default Navigation;