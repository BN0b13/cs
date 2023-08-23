import styled from 'styled-components';

import {
  textColorLight
} from '../../../../styles/theme';

export const NavigationContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${textColorLight};
`;

export const NavOptions = styled.div`
    
`;

export const HeaderLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  padding: 1em;
  color: ${textColorLight};
`;

