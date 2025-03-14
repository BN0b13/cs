import { useContext } from 'react';

import CartIcon from '../../cart-icon/cart-icon.component';
import Dropdown from '../dropdown/dropdown.component';
import Search from '../search/search.component';

import { 
    menuItemsPublic,
    menuItemsLoggedIn
} from '../../../../assets/menu-items';

import { ConfigurationContext } from '../../../../contexts/configuration.context';

import { tokenName } from '../../../../config/tokens';
import { pagesConfig } from '../../../../config/cms';
import CMSTool from '../../../../tools/cms';

import {
    NavigationContainer,
    NavOptions,
    HeaderLink,
    HeaderNonLink
} from './navigation.styles';

const cmsTool = new CMSTool();

const Navigation = () => {
    const { colors } = useContext(ConfigurationContext);

    const loggedInStatus = localStorage.getItem(tokenName);

    if(window.location.pathname === '/login' && pagesConfig.shop.active) {
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

            {pagesConfig.shop.active && <Search />}

            {cmsTool.processHeaderNavigation(menuItemsPublic).map((item, index) => {
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
            {pagesConfig.shop.active &&
                <>
                    {loggedInStatus ?
                        <>
                            {cmsTool.processHeaderNavigation(menuItemsLoggedIn).map((item, index) => {
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
                        </HeaderLink>}
                    <CartIcon loggedInStatus={loggedInStatus} />
                </>
            }
        </NavigationContainer>
    )
}

export default Navigation;